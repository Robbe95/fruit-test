<script setup lang="ts">
import { SOCIAL_INFO } from '@base/constants/company-info/socialInfo.constant'
</script>

<template>
  <div class="flex gap-2">
    <NuxtLink
      v-for="social in SOCIAL_INFO"
      :key="social.label"
      :to="social.url"
      target="_blank"
      class="flex size-8 items-center justify-center rounded-full bg-background focus-ring"
    >
      <AppIcon :icon="social.icon" />
    </NuxtLink>
  </div>
</template>
