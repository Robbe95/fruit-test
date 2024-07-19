import {
  type DefaultError,
  type QueryClient,
  type QueryKey,
  useQuery,
  type UseQueryDefinedReturnType,
  type UseQueryOptions,
  type UseQueryReturnType,
} from '@tanstack/vue-query'

export function useClientOnlyQuery<
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
>,
  queryClient?: QueryClient,
):
  | UseQueryDefinedReturnType<TData, TError>
  | UseQueryReturnType<TData, TError> {
  const optionsValue = toValue(options)
  const optionsEnabled = computed<boolean>(() => toValue(optionsValue.enabled) ?? true)
  const isMounted = ref<boolean>(false)

  onMounted(() => {
    isMounted.value = true
  })

  return useQuery({
    ...optionsValue,
    enabled: computed<boolean>(() => isMounted.value && optionsEnabled.value),
  }, queryClient)
}
