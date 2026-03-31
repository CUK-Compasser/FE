import { type QueryClient } from "@tanstack/react-query";
import { createMutationWithCache } from "../core/mutation";
import type { CompasserApi } from "../core/types";
import type {
  JoinReqDTO,
  SignUpResponse,
  LoginReqDTO,
  LoginResponse,
  LogoutResponse,
  KakaoLoginUrlResponse,
  KakaoCallbackResponse,
} from "../models/auth";

export const createAuthModule = (api: CompasserApi) => {
  const keys = {
    all: ["auth"] as const,
    session: () => [...keys.all, "session"] as const,
  };

  const requests = {
    signUp: async (body: JoinReqDTO) => {
      const { data } = await api.publicClient.post<SignUpResponse>(
        "/oauth2/sign-up",
        body,
      );
      return data;
    },

    login: async (body: LoginReqDTO) => {
      const { data } = await api.publicClient.post<LoginResponse>(
        "/oauth2/login",
        body,
      );
      return data;
    },

    logout: async () => {
      const { data } = await api.privateClient.post<LogoutResponse>(
        "/oauth2/logout",
      );
      return data;
    },

    loginKakao: async () => {
      const { data } = await api.publicClient.post<KakaoLoginUrlResponse>(
        "/oauth2/login-kakao",
      );
      return data;
    },

    callbackKakao: async (code: string) => {
      const { data } = await api.publicClient.get<KakaoCallbackResponse>(
        "/oauth2/code/kakao",
        {
          params: { code },
        },
      );
      return data;
    },
  };

  const mutations = {
    signUp: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "sign-up"],
        mutationFn: requests.signUp,
      }),

    login: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "login"],
        mutationFn: requests.login,
        getActions: (response) => [
          {
            type: "set",
            queryKey: keys.session(),
            value: response.data,
          },
        ],
      }),

    logout: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "logout"],
        mutationFn: requests.logout,
        getActions: () => [
          {
            type: "remove",
            queryKey: keys.all,
          },
        ],
        onSuccess: async () => {
          api.tokenStore.clearTokens();
        },
      }),

    loginKakao: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "login-kakao"],
        mutationFn: requests.loginKakao,
      }),

    callbackKakao: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "callback-kakao"],
        mutationFn: requests.callbackKakao,
        getActions: (response) => [
          {
            type: "set",
            queryKey: keys.session(),
            value: response.data,
          },
        ],
      }),
  };

  return { keys, requests, mutations };
};