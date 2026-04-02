"use client";

import {
  createCompasserApi,
  createAuthModule,
  type TokenPair,
  type TokenStore,
} from "@compasser/api";

const tokenStore: TokenStore = {
  getAccessToken: () =>
    typeof window === "undefined" ? null : localStorage.getItem("accessToken"),

  getRefreshToken: () =>
    typeof window === "undefined" ? null : localStorage.getItem("refreshToken"),

  setTokens: ({ accessToken, refreshToken }: TokenPair) => {
    if (typeof window === "undefined") return;

    localStorage.setItem("accessToken", accessToken);

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  },

  clearTokens: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

export const compasserApi = createCompasserApi({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  tokenStore,
});

export const authModule = createAuthModule(compasserApi);