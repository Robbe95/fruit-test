import { useCart } from '@cart/api/cart/queries/useCart'
import { useCartAdd } from '@cart/api/cart/queries/useCartAdd'
import { useCartAddBulk } from '@cart/api/cart/queries/useCartAddBulk'
import { useCartRemove } from '@cart/api/cart/queries/useCartRemove'
import { useCartUpdate } from '@cart/api/cart/queries/useCartUpdate'
import { useOrderOrCartData } from '@cart/composables/cart/useOrderOrCartData'
import type { CartAddForm } from '@cart/models/cart/add/cartAddForm.model'
import type { CartAddBulkForm } from '@cart/models/cart/add-bulk/cartAddBulkForm.model'
import type { CartRemoveForm } from '@cart/models/cart/remove/cartRemoveForm.model'
import type { CartUpdateForm } from '@cart/models/cart/update/cartUpdateForm.model'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cart = useCart()
  const cartAdd = useCartAdd()
  const cartRemove = useCartRemove()
  const cartUpdate = useCartUpdate()
  const cartAddBulk = useCartAddBulk()

  const {
    amountOfProducts,
    productsPrice,
    shippingPrice,
    totalPrice,
  } = useOrderOrCartData(cart.data ?? null)

  async function addProduct(payload: Omit<CartAddForm, 'cartId'>) {
    if (cart.data.value == null) {
      return
    }

    await cartAdd.mutateAsync({
      ...payload,
      cartId: cart.data.value?.id,
    })
  }

  async function addProducts(payload: Omit<CartAddBulkForm, 'cartId'>) {
    if (cart.data.value == null) {
      return
    }

    await cartAddBulk.mutateAsync({
      ...payload,
      cartId: cart.data.value.id,
    })
  }

  async function removeProduct(payload: Omit<CartRemoveForm, 'cartId'>) {
    if (cart.data.value == null) {
      return
    }

    await cartRemove.mutateAsync({
      cartId: cart.data.value.id,
      orderProductId: payload.orderProductId,
    })
  }

  async function updateProduct(payload: Omit<CartUpdateForm, 'cartId'>) {
    if (cart.data.value == null) {
      return
    }

    await cartUpdate.mutateAsync({
      cartId: cart.data.value.id,
      orderProductId: payload.orderProductId,
      quantity: payload.quantity,
    })
  }

  const isCartUpdating = computed<boolean>(() => {
    return cartAdd.isPending.value
      || cartAddBulk.isPending.value
      || cartRemove.isPending.value
      || cartUpdate.isPending.value
      || cart.isPending.value
  })

  onServerPrefetch(async () => {
    await cart.suspense()
  })

  return {
    isCartUpdating,
    addProduct,
    addProducts,
    amountOfProducts,
    cart,
    productsPrice,
    removeProduct,
    shippingPrice,
    totalPrice,
    updateProduct,
  }
})
