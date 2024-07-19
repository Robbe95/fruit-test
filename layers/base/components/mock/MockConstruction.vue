<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <AppCard class="bg-neutral-200">
    <div class="flex h-full min-h-80 flex-1 flex-col items-center justify-center gap-2">
      <p class="font-bold text-neutral-400">
        {{ t('shared.under_construction') }}
      </p>
      <p class="text-neutral-300">
        {{ t('shared.coming_soon') }}
      </p>
      <slot />
    </div>
  </AppCard>
</template>
