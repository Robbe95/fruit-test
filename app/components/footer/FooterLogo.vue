<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <NuxtLinkLocale
    :to="{
      name: 'index',
    }"
    class="w-full max-w-48 rounded py-2 focus-ring"
  >
    {{ t('todo.logo') }}
  </NuxtLinkLocale>
</template>
