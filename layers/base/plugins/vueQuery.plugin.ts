import type {
  DehydratedState,
  VueQueryPluginOptions,
} from '@tanstack/vue-query'
import {
  dehydrate,
  hydrate,
  keepPreviousData,
  QueryClient,
  VueQueryPlugin,
} from '@tanstack/vue-query'
import {
  defineNuxtPlugin,
  useState,
} from 'nuxt/app'

export default defineNuxtPlugin({
  name: 'vue-query',
  parallel: true,
  setup(nuxt) {
    const vueQueryState = useState<DehydratedState | null>('vue-query')

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5000,
          placeholderData: keepPreviousData,
          retry: 0,
        },
      },
    })
    const options: VueQueryPluginOptions = {
      queryClient,
    }

    nuxt.vueApp.use(VueQueryPlugin, options)

    if (import.meta.server != null && import.meta.server) {
      nuxt.hooks.hook('app:rendered', () => {
        vueQueryState.value = dehydrate(queryClient)
      })
    }

    if (import.meta.client != null && import.meta.client) {
      nuxt.hooks.hook('app:created', () => {
        hydrate(queryClient, vueQueryState.value)
      })
    }
  },
})
