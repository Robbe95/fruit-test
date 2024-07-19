<script setup lang="ts">
import AppIcon from '@base/components/core/icon/AppIcon.vue'

const props = defineProps<{
  id?: string
  variant?: 'default' | 'white'
}>()

const amount = defineModel<null | number>({
  required: true,
})

const canDecrement = computed<boolean>(() => {
  return amount.value !== null && amount.value > 0
})

function increment() {
  if (amount.value === null) {
    amount.value = 1

    return
  }

  amount.value++
}

function decrement() {
  if (amount.value === null || amount.value === 0) {
    return
  }

  amount.value--
}

const amountNumber = computed<null | number | string>({
  get() {
    return amount.value ?? null
  },
  set(value) {
    if (typeof value === 'string') {
      amount.value = null

      return
    }

    amount.value = value ?? null
  },
})

const backgroundColor = computed<string>(() => {
  return props.variant === 'white' ? 'bg-white disabled:text-foreground/30' : 'bg-background disabled:text-foreground/30'
})
</script>

<template>
  <div class="relative flex flex-1 text-foreground">
    <button
      :disabled="!canDecrement"
      :class="backgroundColor"
      class="z-10 flex size-10 items-center justify-center rounded-l-button focus-ring focus:z-20"
      @click="decrement"
    >
      <AppIcon
        icon="minus"
      />
    </button>
    <input
      :id="id"
      v-model="amountNumber"
      :class="backgroundColor"
      placeholder="0"
      class="relative z-10 h-10 w-full flex-1 rounded-none text-center focus-ring focus:z-20"
      type="number"
    >
    <button
      :class="backgroundColor"
      class="z-10 flex size-10 items-center justify-center rounded-r-button focus-ring focus:z-20"
      @click="increment"
    >
      <AppIcon
        icon="plus"
      />
    </button>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
