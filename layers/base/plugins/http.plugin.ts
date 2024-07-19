import { createHttpZodClient } from '@base/libs/httpZodClient.lib'

export default defineNuxtPlugin({
  dependsOn: [
    'api',
  ],
  name: 'http',
  parallel: true,
  setup() {
    // const toast = useToast()
    const api = useNuxtApp().$api as typeof $fetch
    const unauthorizedApi = useNuxtApp().$unauthorizedApi as typeof $fetch

    interface ZodError {
      error: unknown
      method: string
      url: string
    }

    const ENVIRONMENT = import.meta.env.ENVIRONMENT

    function onZodError({ error, method, url }: ZodError): void {
      if (ENVIRONMENT !== 'production') {
        // handle production error
        // toast.error({ title: `${method.toUpperCase()} ${url} returned a malformed response\n\n` })
      }

      console.error(`${method.toUpperCase()} ${url} returned a malformed response\n\n`, JSON.stringify(error))
    }

    const httpClient = createHttpZodClient({
      fetch: api,
      onZodError,
    })

    const unauthorizedHttpClient = createHttpZodClient({
      fetch: unauthorizedApi,
      onZodError,
    })

    return {
      provide: {
        httpClient,
        unauthorizedHttpClient,
      },
    }
  },
})
