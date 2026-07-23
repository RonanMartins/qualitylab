import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AUTH_ENV_KEYS } from '../constants/auth.constants';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthTokens } from '../types/auth.types';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
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
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await argon2.verify(
      user.passwordHash,
      loginDto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshTokenExpiresIn = this.configService.getOrThrow<string>(
      AUTH_ENV_KEYS.JWT_REFRESH_TOKEN_EXPIRES_IN,
    );
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: refreshTokenExpiresIn as JwtSignOptions['expiresIn'],
    });

    const refreshTokenHash = await argon2.hash(refreshToken);
    const decoded = this.jwtService.decode(refreshToken);
    const expiresAt = this.resolveTokenExpiration(decoded);

    await this.prisma.$transaction([
      this.prisma.userSession.create({
        data: {
          userId: user.id,
          refreshTokenHash,
          expiresAt,
        },
      }),
      this.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      }),
    ]);

    return { accessToken, refreshToken };
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
