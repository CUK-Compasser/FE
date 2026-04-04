import {
  mutationOptions,
  type MutationKey,
  type QueryClient,
  type QueryKey,
} from "@tanstack/react-query";

type MaybePromise<T> = T | Promise<T>;

export type CacheAction<TData, TVariables> =
  | {
      type: "set";
      queryKey: QueryKey;
      value: unknown | ((data: TData, variables: TVariables) => unknown);
    }
  | {
      type: "merge";
      queryKey: QueryKey;
      updater: (
        oldData: unknown,
        data: TData,
        variables: TVariables,
      ) => unknown;
    }
  | {
      type: "invalidate";
      queryKey: QueryKey;
    }
  | {
      type: "remove";
      queryKey: QueryKey;
    };

export interface CreateMutationWithCacheParams<
  TData,
  TVariables,
  TContext = unknown,
  TError = unknown,
> {
  queryClient: QueryClient;
  mutationKey?: MutationKey;
  mutationFn: (variables: TVariables) => Promise<TData>;
  getActions?: (
    data: TData,
    variables: TVariables,
  ) => CacheAction<TData, TVariables>[];
  onMutate?: (variables: TVariables) => MaybePromise<TContext>;
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined,
  ) => MaybePromise<void>;
  onSuccess?: (
    data: TData,
    variables: TVariables,
    context: TContext | undefined,
  ) => MaybePromise<void>;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined,
  ) => MaybePromise<void>;
}

const runCacheActions = async <TData, TVariables>(
  queryClient: QueryClient,
  actions: CacheAction<TData, TVariables>[],
  data: TData,
  variables: TVariables,
) => {
  for (const action of actions) {
    if (action.type === "set") {
      const nextValue =
        typeof action.value === "function"
          ? action.value(data, variables)
          : action.value;

      queryClient.setQueryData(action.queryKey, nextValue);
      continue;
    }

    if (action.type === "merge") {
      queryClient.setQueryData(action.queryKey, (oldData: unknown) =>
        action.updater(oldData, data, variables),
      );
      continue;
    }

    if (action.type === "invalidate") {
      await queryClient.invalidateQueries({
        queryKey: action.queryKey,
      });
      continue;
    }

    if (action.type === "remove") {
      queryClient.removeQueries({
        queryKey: action.queryKey,
      });
    }
  }
};

export const createMutationWithCache = <
  TData,
  TVariables,
  TContext = unknown,
  TError = unknown,
>({
  queryClient,
  mutationKey,
  mutationFn,
  getActions,
  onMutate,
  onError,
  onSuccess,
  onSettled,
}: CreateMutationWithCacheParams<TData, TVariables, TContext, TError>) =>
  mutationOptions<TData, TError, TVariables, TContext>({
    ...(mutationKey ? { mutationKey } : {}),
    mutationFn,
    onMutate,
    onError,
    onSuccess: async (data, variables, context) => {
      const actions = getActions?.(data, variables) ?? [];

      if (actions.length > 0) {
        await runCacheActions(queryClient, actions, data, variables);
      }

      await onSuccess?.(data, variables, context);
    },
    onSettled,
  });