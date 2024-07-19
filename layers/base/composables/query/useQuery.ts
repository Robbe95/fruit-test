import { useClientOnlyQuery } from '@base/composables/query/useClientOnlyQuery'
import {
  type DefaultError,
  type QueryClient,
  type QueryKey,
  useQuery as useTanstackQuery,
  type UseQueryDefinedReturnType,
  type UseQueryOptions,
  type UseQueryReturnType,
} from '@tanstack/vue-query'

export function useQuery<
TQueryFnData,
TError = DefaultError,
TData = TQueryFnData,
TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryFnData,
  TQueryKey
> & {
  isClientOnly?: boolean
},
  queryClient?: QueryClient,
):
  | UseQueryDefinedReturnType<TData, TError>
  | UseQueryReturnType<TData, TError> {
  if (options?.isClientOnly != null && options.isClientOnly) {
    return useClientOnlyQuery(options, queryClient)
  }

  return useTanstackQuery(options, queryClient)
}
