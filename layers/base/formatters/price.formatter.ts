import { useGlobalI18n } from '@base/composables/i18n/useGlobaI18n'
import type { Price } from '@base/models/price/price.model'

export function formatPrice(price: Price | null): string {
  if (price === null) {
    return '-'
  }
  const { locale } = useGlobalI18n()

  const formatter = new Intl.NumberFormat(locale.value, {
    currency: 'EUR',
    style: 'currency',
  })

  return formatter.format(price)
}
