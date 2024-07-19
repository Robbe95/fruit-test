<script setup lang="ts">
import AppIconButton from '@base/components/core/button/AppIconButton.vue'
import { PopoverClose } from 'radix-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <PopoverClose :as-child="true">
    <AppIconButton
      :label="t('shared.close')"
      variant="ghost"
      icon="close"
      icon-size="default"
    />
  </PopoverClose>
</template>
