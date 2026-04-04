import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

export type JsonValue = Record<string, unknown>;

export interface TokenPair {
  accessToken: string;
  refreshToken?: string;
}

export interface TokenStore {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setTokens: (tokens: TokenPair) => void;
  clearTokens: () => void;
}

export interface RefreshTokensContext {
  publicClient: AxiosInstance;
  refreshToken: string | null;
  originalRequest: InternalAxiosRequestConfig & { _retry?: boolean };
}

export interface CreateCompasserApiOptions {
  baseURL: string;
  tokenStore: TokenStore;
  withCredentials?: boolean;
  refreshTokens?: (context: RefreshTokensContext) => Promise<TokenPair>;
  onAuthFailure?: (error: unknown) => void;
  authScheme?: string;
}

export interface CompasserApi {
  publicClient: AxiosInstance;
  privateClient: AxiosInstance;
  tokenStore: TokenStore;
}