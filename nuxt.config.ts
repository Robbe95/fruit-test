import path from 'node:path'

export default defineNuxtConfig({
  alias: {
    '@@': path.resolve(__dirname, './disable'),
    '@auth': path.resolve(__dirname, './layers/auth'),
    '@base': path.resolve(__dirname, './layers/base'),
    '@cart': path.resolve(__dirname, './layers/cart'),
    '~~': path.resolve(__dirname, './disable'),
  },
  app: {
    head: {
      title: 'Nuxt Project Template',
      link: [
        { href: '/favicon.ico', rel: 'icon', type: 'image/ico' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '', hid: 'description' },
      ],
    },
  },

  components: [
    {
      pathPrefix: false,
      path: '@/components',
    },
    {
      pathPrefix: false,
      path: '@/views',
    },
  ],

  devtools: { enabled: true },

  eslint: {
    config: {
      standalone: false,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  i18n: {
    langDir: 'locales',
    locales: [
      { iso: 'en-US', code: 'en', file: 'en.json' },
      { iso: 'nl-BE', code: 'nl', file: 'nl.json' },
      { iso: 'fr-FR', code: 'fr', file: 'fr.json' },
    ],
  },

  imports: {
    scan: false,
  },

  modules: [
    '@nuxt/eslint',
    '@vite-pwa/nuxt',
  ],
  nitro: {
    compressPublicAssets: {
      brotli: true,
    },
    prerender: {
      failOnError: false,
    },
  },
  pwa: {
    devOptions: {
      enabled: true,
    },
    filename: 'syncWorker.js',
    includeAssets: [
      '**/*',
    ],

    injectRegister: 'auto',
    manifest: {
      name: 'Fruitje',
      background_color: '#ffffff',

      description: 'Fruitje',
      display: 'standalone',
      icons: [
        {
          sizes: '512x512',
          src: '/android-chrome-512x512.png',
          type: 'image/png',
        },
        {
          sizes: '192x192',
          src: '/android-chrome-192x192.png',
          type: 'image/png',
        },
        {
          sizes: '180x180',
          src: '/apple-touch-icon.png',
          type: 'image/png',
        },
        {
          sizes: '16x16',
          src: '/favicon-16x16.png',
          type: 'image/png',
        },
        {
          sizes: '32x32',
          src: '/favicon-32x32.png',
          type: 'image/png',
        },
      ],
      scope: '/',
      short_name: 'Fruitje',
      start_url: '/',
      theme_color: 'rgb(23, 23, 23)',
    },
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    workbox: {
      globPatterns: [
        '**/*',
      ],

      runtimeCaching: [
        // Doesnt work for stupid safari
        // {
        //   handler: 'NetworkOnly',
        //   method: 'POST',
        //   options: {
        //     backgroundSync: {
        //       name: 'features-queue',
        //       options: {
        //         maxRetentionTime: 24 * 60,
        //         onSync: () => {
        //           try {
        //             // @ts-expect-error this works its service worker trust me
        //             // eslint-disable-next-line no-restricted-globals
        //             self.clients.matchAll().then((clients) => {
        //               clients.forEach((client) => client.postMessage('features-queue'))
        //             })
        //           }
        //           catch (error) {
        //             // Handle errors if necessary
        //             console.error('Sync failed:', error)
        //           }
        //         },
        //       },
        //     },
        //   },
        //   // urlPattern: /^http:\/\/localhost:8000\/api\/features/,
        //   urlPattern: /^http:\/\/192.168.2.88:8000\/api\/features/,
        // },
        {
          handler: 'CacheFirst',
          options: {
            cacheName: 'ol-cache',
            cacheableResponse: {
              statuses: [
                0,
                200,
              ],
            },
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              maxEntries: 200,
            },
          },
          urlPattern: /^https:\/\/tile\.openstreetmap\.org\/.*/,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://192.168.2.88:8000', // can be overridden by NUXT_PUBLIC_API_BASE_URL environment variable
    },
  },
  ssr: false,
})
