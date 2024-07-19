import { useGlobalI18n } from '@base/composables/i18n/useGlobaI18n'

export function translateLocale(type: string): string {
  const { t } = useGlobalI18n()

  switch (type) {
    case 'fr':
      return t('locale.fr')
    case 'nl':
      return t('locale.nl')
    case 'en':
      return t('locale.en')
    default:
      return t('locale.en')
  }
}
