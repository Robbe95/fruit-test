import { useGlobalI18n } from '@base/composables/i18n/useGlobaI18n'
import { formatPrice } from '@base/formatters/price.formatter'
import type { Price } from '@base/models/price/price.model'
import type { Cart } from '@cart/models/cart/get/cart.model'
import type { Order } from '@cart/models/order/detail/order.model'

export function useOrderOrCartData(orderOrCart: MaybeRefOrGetter<Cart | Order | null | undefined>) {
  const { t } = useGlobalI18n()

  const amountOfProducts = computed<number>(() => {
    return toValue(orderOrCart)?.orderProducts.reduce((acc, orderProduct) => acc + orderProduct.quantity, 0) ?? 0
  })

  const productsPrice = computed<Price | null>(() => {
    return toValue(orderOrCart)?.orderProducts.reduce((acc, orderProduct) =>
      acc + orderProduct.price * orderProduct.quantity, 0) as Price ?? null
  })

  const shippingPrice = computed<Price | null>(() => {
    // TODO get real shipping from BE
    return 1000 as Price
  })

  const totalPrice = computed<Price | null>(() => {
    const total = (productsPrice.value ?? 0) + (shippingPrice.value ?? 0) as Price

    return total === 0 ? null : total
  })

  const formattedTotalPrice = computed<string>(() => {
    if (totalPrice.value == null) {
      return t('empty')
    }

    return formatPrice(totalPrice.value)
  })

  const formattedShippingPrice = computed<string>(() => {
    if (shippingPrice.value == null) {
      return t('empty')
    }

    return formatPrice(shippingPrice.value)
  })

  const formattedProductsPrice = computed<string>(() => {
    if (productsPrice.value == null) {
      return t('empty')
    }

    return formatPrice(productsPrice.value)
  })

  return {
    amountOfProducts,
    formattedProductsPrice,
    formattedShippingPrice,
    formattedTotalPrice,
    productsPrice,
    shippingPrice,
    totalPrice,
  }
}
