<script setup lang="ts">
import { formatPrice } from '@base/formatters/price.formatter'
import type { Price } from '@base/models/price/price.model'
import type { Cart } from '@cart/models/cart/get/cart.model'
import { useCartStore } from '@cart/stores/cart.store'
import { PopoverClose } from 'radix-vue'

const { t } = useI18n()

const cartStore = useCartStore()

const amountOfProducts = computed<number>(() => {
  return cartStore.amountOfProducts
})

const totalPrice = computed<Price | null>(() => {
  return cartStore.productsPrice
})

const cart = computed<Cart | null>(() => {
  return cartStore.cart.data ?? null
})

const isCartUpdating = computed<boolean>(() => {
  return cartStore.isCartUpdating
})
</script>

<template>
  <AppPopover
    v-if="cart"
    align="end"
    hide-arrow
  >
    <template #default>
      <button
        :class="{
          'opacity-50': isCartUpdating,
        }"
        class="relative flex w-full items-center gap-4 rounded-button bg-primary px-3 py-1.5 text-left duration-300 lg:w-auto"
      >
        <AppIconCircle
          :label="t('cart.cart')"
          icon="cart"
        />
        <div>
          <div
            class="flex items-center gap-2"
          >
            <AppText
              variant="subtext"
              class="font-medium text-primary-foreground"
            >
              {{ t('cart.cart') }}
            </AppText>

            <AppLoader
              :class="{
                'opacity-100': isCartUpdating,
                'opacity-0': !isCartUpdating,
              }"
              icon="loading"
              class="size-4 text-white duration-200"
            />
          </div>
          <div class="flex gap-2">
            <AppText
              variant="caption"
              class="text-muted"
            >
              {{ t('cart.products_count', { count: amountOfProducts }) }}
            </AppText>
            <AppText
              variant="caption"
              class="font-bold text-white"
            >
              {{ totalPrice ? formatPrice(totalPrice) : t('empty') }}
            </AppText>
          </div>
        </div>
      </button>
    </template>
    <template #content>
      <AppCard class="z-20 min-w-96 p-8">
        <div class="flex flex-col gap-4">
          <AppText
            variant="heading"
            class="font-medium text-foreground"
          >
            {{ t('cart.products_count', { count: amountOfProducts }) }}
          </AppText>
          <div class="custom-vertical-scrollbar flex max-h-80 flex-col gap-2 overflow-auto">
            <div v-if="cart?.orderProducts.length === 0">
              <AppText
                variant="caption"
                class="text-foreground"
              >
                {{ t('cart.no_products') }}
              </AppText>
            </div>
            <CartHeaderProduct
              v-for="orderProduct in cart?.orderProducts"
              :key="orderProduct.id"
              :order-product="orderProduct"
            />
          </div>
          <div class="flex items-center justify-between gap-4">
            <AppText
              variant="heading"
              class="font-medium"
            >
              {{ t('cart.total_to_pay') }}
            </AppText>
            <AppText
              variant="body"
            >
              {{ totalPrice ? formatPrice(totalPrice) : t('empty') }}
            </AppText>
          </div>
          <PopoverClose as-child>
            <AppButtonLink
              to="/checkout/overview"
              class="w-full text-center"
            >
              {{ t('order.finish_order') }}
            </AppButtonLink>
          </PopoverClose>
        </div>
      </AppCard>
    </template>
  </AppPopover>
</template>
