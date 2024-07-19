import { AuthService } from '@auth/api/services/auth.service'
import { AuthTransformer } from '@auth/models/auth.transformer'
import type { CurrentUser } from '@auth/models/current-user/currentUser.model'
import type { LoginForm } from '@auth/models/login/loginForm.model'
import {
  computed,
  ref,
} from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const oAuthClient = useNuxtApp().$oAuthClient
  const lastLoginAttemptEmail = ref<null | string>(null)
  const currentUser = ref<CurrentUser | null>(null)
  const lastLoggedInUser = useCookie<CurrentUser | null>('lastLoggedInUser')
  const isAuthenticated = computed<boolean>(() => currentUser.value === null)

  function setLastLoginAttemptEmail(email: null | string): void {
    lastLoginAttemptEmail.value = email
  }

  function setLastLoggedInUser(user: CurrentUser | null): void {
    lastLoggedInUser.value = user
  }

  async function getCurrentUser(): Promise<CurrentUser> {
    if (currentUser.value != null) {
      return currentUser.value
    }

    currentUser.value = await AuthService.getCurrentUser()

    return currentUser.value
  }

  function setCurrentUser(user: CurrentUser | null): void {
    currentUser.value = user
  }

  async function login(data: LoginForm): Promise<void> {
    const { password, username } = AuthTransformer.toLoginDto(data)

    await oAuthClient.login(username, password)
  }

  async function logout(): Promise<void> {
    const router = useRouter()
    const localeRoute = useLocaleRoute()
    const localeAuthRoute = localeRoute('/auth/login')

    oAuthClient.logout()
    setCurrentUser(null)

    if (localeAuthRoute?.path != null) {
      await router.push(localeAuthRoute.path)
    }
  }

  return {
    isAuthenticated,
    currentUser,
    getCurrentUser,
    lastLoggedInUser,
    lastLoginAttemptEmail,
    login,
    logout,
    setCurrentUser,
    setLastLoggedInUser,
    setLastLoginAttemptEmail,
  }
})
