import { useNuxtApp } from '#imports'

export function useGlobalI18n() {
  const nuxtApp = useNuxtApp()

  return nuxtApp.$i18n
}
