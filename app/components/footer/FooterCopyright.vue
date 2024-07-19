<script setup lang="ts">
const CURRENT_YEAR = new Date().getFullYear()
const { t } = useI18n()
</script>

<template>
  <div class="bg-primary">
    <div class="container mx-auto flex flex-col gap-1 bg-primary px-4 py-2 text-caption text-white lg:flex-row lg:gap-6">
      <p>
        {{ t('footer.copyright', { year: CURRENT_YEAR }) }}
      </p>
      <a
        href="/"
        target="_blank"
        class="rounded focus-ring hover:underline focus:underline"
      >
        {{ t('footer.privacy_policy') }}
      </a>
      <a
        href="/"
        target="_blank"
        class="rounded focus-ring hover:underline focus:underline"
      >
        {{ t('footer.cookie_policy') }}
      </a>
    </div>
  </div>
</template>
