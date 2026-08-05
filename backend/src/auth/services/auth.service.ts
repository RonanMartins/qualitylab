import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { randomUUID } from 'node:crypto';
import {
  AUTH_ENV_KEYS,
  AUTH_ERROR_MESSAGES,
} from '../constants/auth.constants';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { RefreshTokenPayload } from '../interfaces/refresh-token-payload.interface';
import { AuthenticationPolicy } from '../policies/authentication.policy';
import { AuthTokens } from '../types/auth.types';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  private readonly authenticationPolicy = new AuthenticationPolicy();

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthTokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    if (!this.authenticationPolicy.canAuthenticate(user)) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await argon2.verify(
      user.passwordHash,
      loginDto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return this.prisma.$transaction(async (tx) => {
      const sessionId = randomUUID();

      const accessToken = this.signAccessToken({
        sub: user.id,
        email: user.email,
      });

      const refreshToken = this.signRefreshToken({
        userId: user.id,
        sessionId,
      });

      const refreshTokenHash = await argon2.hash(refreshToken);
      const expiresAt = this.resolveTokenExpiration(
        this.jwtService.decode(refreshToken),
      );

      await tx.userSession.create({
        data: {
          id: sessionId,
          userId: user.id,
          refreshTokenHash,
          expiresAt,
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      return { accessToken, refreshToken };
    });
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<AuthTokens> {
    const payload = this.verifyRefreshToken(refreshTokenDto.refreshToken);

    const session = await this.prisma.userSession.findUnique({
      where: { id: payload.sessionId },
    });

    if (!session || session.userId !== payload.userId) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.INVALID_REFRESH_TOKEN,
      );
    }

    if (session.expiresAt.getTime() <= Date.now()) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.INVALID_REFRESH_TOKEN,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.INVALID_REFRESH_TOKEN,
      );
    }

    if (!this.authenticationPolicy.canAuthenticate(user)) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.INVALID_REFRESH_TOKEN,
      );
    }

    const isRefreshTokenValid = await argon2.verify(
      session.refreshTokenHash,
      refreshTokenDto.refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.INVALID_REFRESH_TOKEN,
      );
    }

    const accessToken = this.signAccessToken({
      sub: user.id,
      email: user.email,
    });

    const refreshToken = this.signRefreshToken({
      userId: user.id,
      sessionId: session.id,
    });

    const refreshTokenHash = await argon2.hash(refreshToken);
    const expiresAt = this.resolveTokenExpiration(
      this.jwtService.decode(refreshToken),
    );

    await this.prisma.$transaction(async (tx) => {
      await tx.userSession.update({
        where: { id: session.id },
        data: {
          refreshTokenHash,
          expiresAt,
        },
      });
    });

    return { accessToken, refreshToken };
  }

  private signAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  private signRefreshToken(payload: RefreshTokenPayload): string {
    const expiresIn = this.configService.getOrThrow<string>(
      AUTH_ENV_KEYS.JWT_REFRESH_TOKEN_EXPIRES_IN,
    );

    return this.jwtService.sign(payload, {
      expiresIn: expiresIn as JwtSignOptions['expiresIn'],
    });
  }

  private verifyRefreshToken(token: string): RefreshTokenPayload {
    const secret = this.configService.getOrThrow<string>(
      AUTH_ENV_KEYS.JWT_SECRET,
    );

    let payload: RefreshTokenPayload;

    try {
      payload = this.jwtService.verify<RefreshTokenPayload>(token, {
        secret,
      });
    } catch {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.INVALID_REFRESH_TOKEN,
      );
    }

    if (
      typeof payload.userId !== 'string' ||
      typeof payload.sessionId !== 'string'
    ) {
      throw new UnauthorizedException(
        AUTH_ERROR_MESSAGES.INVALID_REFRESH_TOKEN,
      );
    }

    return {
      userId: payload.userId,
      sessionId: payload.sessionId,
    };
  }

  private resolveTokenExpiration(decoded: unknown): Date {
    if (
      decoded === null ||
      typeof decoded === 'string' ||
      typeof decoded !== 'object' ||
      !('exp' in decoded) ||
      typeof decoded.exp !== 'number'
    ) {
      throw new InternalServerErrorException(
        'Failed to resolve refresh token expiration',
      );
    }

    return new Date(decoded.exp * 1000);
  }
}
