<script setup lang="ts">
import { formatPrice } from '@base/formatters/price.formatter'
import type { Price } from '@base/models/price/price.model'
import type { OrderProduct } from '@cart/models/order-product/orderProduct.model'
import { useCartStore } from '@cart/stores/cart.store'
import { AppText } from '@wisemen/vue-core'

interface Props {
  orderProduct: OrderProduct
}
const props = defineProps<Props>()

const isUpdating = ref<boolean>(false)
const isRemoving = ref<boolean>(false)

const cartStore = useCartStore()
const totalPrice = computed<Price>(() => {
  return props.orderProduct.quantity * (props.orderProduct.product.price ?? 0) as Price
})

const debouncedUpdate = useDebounceFn((amount: number) => {
  void onUpdateProduct(amount)
}, 250)

const pendingAmount = ref<number>(props.orderProduct.quantity)

const amount = computed<number>({
  get: () => pendingAmount.value,
  set: (value: number) => {
    pendingAmount.value = value
    void debouncedUpdate(value)
  },
})

async function onRemoveProduct() {
  try {
    isRemoving.value = true
    await cartStore.removeProduct({
      orderProductId: props.orderProduct.id,
    })
  }
  finally {
    isRemoving.value = false
  }
}

async function onUpdateProduct(amount: number) {
  try {
    isUpdating.value = true
    await cartStore.updateProduct({
      orderProductId: props.orderProduct.id,
      quantity: amount,
    })
    pendingAmount.value = amount
  }
  finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <div
    class="relative rounded-button bg-neutral-100 p-3"
  >
    <div
      class="flex w-80 items-center justify-between gap-4"
    >
      <AppText
        variant="body"
        class="flex items-center gap-2 font-medium"
      >
        {{ props.orderProduct.product.name }}
        <Transition name="fade-static">
          <AppLoader
            v-if="isUpdating"
            class="size-3"
            icon="loading"
          />
        </Transition>
      </AppText>
      <AppText variant="subtext">
        {{ formatPrice(totalPrice) }}
      </AppText>
    </div>
    <AppDivider class="my-2 bg-primary/10" />
    <CartHeaderActions
      v-model:amount="amount"
      :is-removing="isRemoving"
      @remove="onRemoveProduct"
    />
  </div>
</template>
