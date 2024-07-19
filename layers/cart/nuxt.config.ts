import path from 'node:path'

export default defineNuxtConfig({
  alias: {
    '@auth': path.resolve(__dirname, '../auth'),
    '@base': path.resolve(__dirname, '../base'),
    '@cart': path.resolve(__dirname, './'),
  },
  components: [
    {
      pathPrefix: false,
      path: '@cart/components',
    },
    {
      pathPrefix: false,
      path: '@cart/views',
    },
  ],

  extends: [
    '../base',
    '../auth',
  ],
  i18n: {
    langDir: 'locales',
    locales: [
      { iso: 'en-US', code: 'en', file: 'en.json' },
      { iso: 'nl-BE', code: 'nl', file: 'nl.json' },
      { iso: 'fr-FR', code: 'fr', file: 'fr.json' },
    ],
  },
})
