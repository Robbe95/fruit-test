<script setup lang="ts">
defineProps<{
  isRemoving?: boolean
}>()

const emits = defineEmits<{
  remove: []
}>()
const amount = defineModel<null | number>('amount', {
  required: true,
})

const { t } = useI18n()

function onRemove() {
  emits('remove')
}
</script>

<template>
  <div
    class="relative flex gap-2"
  >
    <AppIncrement
      v-model="amount"
      variant="white"
    />
    <AppIconButton
      :label="t('cart.remove')"
      :is-loading="isRemoving"
      icon="trash"
      variant="destructive"
      icon-size="lg"
      @click="onRemove"
    />
  </div>
</template>
