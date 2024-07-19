<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex items-center justify-center">
    <NuxtLinkLocale
      :to="{
        name: 'index',
      }"
      class="grid w-40 place-items-center rounded-card p-2 focus-ring lg:w-52"
    >
      {{ t('todo.logo') }}
    </NuxtLinkLocale>
  </div>
</template>
