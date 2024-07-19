export function useApi() {
  const httpClient = useNuxtApp().$httpClient

  return httpClient
}

export function useUnauthorizedApi() {
  const unauthorizedHttpClient = useNuxtApp().$unauthorizedHttpClient

  return unauthorizedHttpClient
}
