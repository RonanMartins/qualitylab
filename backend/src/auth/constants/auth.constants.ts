export const AUTH_ROUTE_PREFIX = 'auth';

export const AUTH_ROUTE_PATHS = {
  LOGIN: 'login',
  REFRESH: 'refresh',
  LOGOUT: 'logout',
} as const;

export const AUTH_ENV_KEYS = {
  DATABASE_URL: 'DATABASE_URL',
  JWT_SECRET: 'JWT_SECRET',
  JWT_ACCESS_TOKEN_EXPIRES_IN: 'JWT_ACCESS_TOKEN_EXPIRES_IN',
  JWT_REFRESH_TOKEN_EXPIRES_IN: 'JWT_REFRESH_TOKEN_EXPIRES_IN',
} as const;

export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
} as const;
