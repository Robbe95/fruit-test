import WisemenEslintConfig from '@wisemen/eslint-config-vue'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  ...(await WisemenEslintConfig),
  {
    ignores: [
      '**/layers/base/components/core/sonner/Toaster.vue',
    ],
  },
  {
    rules: {
      'ts/explicit-function-return-type': 'off',
      'vue/no-undef-components': 'off',
    },
  },
)
