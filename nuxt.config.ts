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
  ],
  nitro: {
    compressPublicAssets: {
      brotli: true,
    },
    prerender: {
      failOnError: false,
    },
  },
})
