"use client";

import {
  createCompasserApi,
  createAuthModule,
  type TokenPair,
  type TokenStore,
  createOwnerModule,
  createStoreModule,
  createRandomBoxModule,
  createStoreImageModule,
} from "@compasser/api";

const tokenStore: TokenStore = {
  getAccessToken: () =>
    typeof window === "undefined" ? null : localStorage.getItem("ownerAccessToken"),

  getRefreshToken: () =>
    typeof window === "undefined" ? null : localStorage.getItem("ownerRefreshToken"),

  setTokens: ({ accessToken, refreshToken }: TokenPair) => {
    if (typeof window === "undefined") return;

    localStorage.setItem("ownerAccessToken", accessToken);

    if (refreshToken) {
      localStorage.setItem("ownerRefreshToken", refreshToken);
    }
  },

  clearTokens: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("ownerAccessToken");
    localStorage.removeItem("ownerRefreshToken");
  },
};

export const compasserApi = createCompasserApi({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  tokenStore,
});

export const authModule = createAuthModule(compasserApi);
export const ownerModule = createOwnerModule(compasserApi);
export const storeModule = createStoreModule(compasserApi);
export const randomBoxModule = createRandomBoxModule(compasserApi);
export const storeImageModule = createStoreImageModule(compasserApi);