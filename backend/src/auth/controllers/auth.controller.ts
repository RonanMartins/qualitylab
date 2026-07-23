import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AUTH_ROUTE_PATHS } from '../constants/auth.constants';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { AuthTokens } from '../types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_ROUTE_PATHS.LOGIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Body() loginDto: LoginDto): Promise<AuthTokens> {
    return this.authService.login(loginDto);
  }
}
