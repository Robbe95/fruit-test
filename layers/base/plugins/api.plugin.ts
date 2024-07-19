import {
  addAuthorizationHeader,
  OAuth2VueClient,
} from '@base/libs/nuxtOAuthClient.lib'

export default defineNuxtPlugin({
  name: 'api',
  parallel: true,
  setup() {
    const config = useRuntimeConfig()

    const API_CLIENT_ID = config.public.apiClientId
    const API_CLIENT_SECRET = config.public.apiClientSecret
    const API_BASE_URL = config.public.apiBaseUrl
    const API_AUTH_URL = config.public.apiAuthUrl

    const oAuthClient = new OAuth2VueClient({
      clientId: API_CLIENT_ID,
      clientSecret: API_CLIENT_SECRET,
      fetchInstance: $fetch,
      tokenEndpoint: `${API_AUTH_URL}/token`,
    })

    const api = $fetch.create({
      baseURL: `${API_BASE_URL}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      async onRequest({ options }) {
        await addAuthorizationHeader(oAuthClient, options)
      },
      async onResponseError({ response }) {
        const localeRoute = useLocaleRoute()

        if (response.status === 401) {
          await navigateTo(localeRoute('/auth/login'))
        }
      },
    })

    const unauthorizedApi = $fetch.create({
      baseURL: `${API_BASE_URL}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })

    return {
      provide: {
        api,
        oAuthClient,
        unauthorizedApi,
      },
    }
  },
})
