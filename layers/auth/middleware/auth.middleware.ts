import { useAuthStore } from '@auth/stores/auth.store'
import { useGlobalI18n } from '@base/composables/i18n/useGlobaI18n'
import { defineNuxtRouteMiddleware } from 'nuxt/app'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const { locale } = useGlobalI18n()
  const oAuthClient = useNuxtApp().$oAuthClient
  const localePath = `/${locale.value}`

  const loginRedirectPath = `${localePath}/auth/login`
  let userFound = true

  try {
    const hasTokens = oAuthClient.isLoggedIn()

    if (hasTokens == null) {
      return navigateTo(loginRedirectPath)
    }

    await authStore.getCurrentUser()
  }
  catch (error) {
    userFound = false
  }

  if (!userFound) {
    return navigateTo(loginRedirectPath)
  }
})
