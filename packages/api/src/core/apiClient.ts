import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import type { CompasserApi, CreateCompasserApiOptions, TokenPair } from "./types";

interface FailedQueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

const processQueue = (
  queue: FailedQueueItem[],
  error: unknown,
  token: string | null,
) => {
  queue.forEach((item) => {
    if (error) {
      item.reject(error);
      return;
    }

    item.resolve(token ?? "");
  });
};

export const createCompasserApi = (
  options: CreateCompasserApiOptions,
): CompasserApi => {
  const authScheme = options.authScheme ?? "Bearer";
  const withCredentials = options.withCredentials ?? true;

  const publicClient = axios.create({
    baseURL: options.baseURL,
    withCredentials,
  });

  const privateClient = axios.create({
    baseURL: options.baseURL,
    withCredentials,
  });

  privateClient.interceptors.request.use(
    (config) => {
      const accessToken = options.tokenStore.getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `${authScheme} ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  let isRefreshing = false;
  let failedQueue: FailedQueueItem[] = [];

  privateClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
        error.response?.status !== 401 ||
        originalRequest?._retry ||
        !options.refreshTokens
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `${authScheme} ${token}`;
              resolve(privateClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const nextTokens: TokenPair = await options.refreshTokens({
          publicClient,
          refreshToken: options.tokenStore.getRefreshToken(),
          originalRequest,
        });

        options.tokenStore.setTokens(nextTokens);
        privateClient.defaults.headers.common.Authorization =
          `${authScheme} ${nextTokens.accessToken}`;

        processQueue(failedQueue, null, nextTokens.accessToken);
        failedQueue = [];

        originalRequest.headers.Authorization =
          `${authScheme} ${nextTokens.accessToken}`;

        return privateClient(originalRequest);
      } catch (refreshError) {
        processQueue(failedQueue, refreshError, null);
        failedQueue = [];
        options.tokenStore.clearTokens();
        options.onAuthFailure?.(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );

  return {
    publicClient,
    privateClient,
    tokenStore: options.tokenStore,
  };
};