import type { TokenPair, TokenStore } from "./types";

export interface LocalStorageTokenStoreOptions {
  accessTokenKey?: string;
  refreshTokenKey?: string;
}

const isBrowser = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const createLocalStorageTokenStore = (
  options: LocalStorageTokenStoreOptions = {},
): TokenStore => {
  const accessTokenKey = options.accessTokenKey ?? "accessToken";
  const refreshTokenKey = options.refreshTokenKey ?? "refreshToken";

  return {
    getAccessToken: () => (isBrowser() ? window.localStorage.getItem(accessTokenKey) : null),
    getRefreshToken: () => (isBrowser() ? window.localStorage.getItem(refreshTokenKey) : null),
    setTokens: ({ accessToken, refreshToken }: TokenPair) => {
      if (!isBrowser()) return;
      window.localStorage.setItem(accessTokenKey, accessToken);
      if (refreshToken) {
        window.localStorage.setItem(refreshTokenKey, refreshToken);
      }
    },
    clearTokens: () => {
      if (!isBrowser()) return;
      window.localStorage.removeItem(accessTokenKey);
      window.localStorage.removeItem(refreshTokenKey);
    },
  };
};