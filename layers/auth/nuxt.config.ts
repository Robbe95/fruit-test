import path from 'node:path'

export default defineNuxtConfig({
  alias: {
    '@base': path.resolve(__dirname, '../base'),
  },
  components: [
    {
      pathPrefix: false,
      path: '@auth/components',
    },
    {
      pathPrefix: false,
      path: '@auth/views',
    },
  ],

  extends: [
    '../base',
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
