<script setup lang="ts">
import AppIconButton from '@base/components/core/button/AppIconButton.vue'
import { DialogClose } from 'radix-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <DialogClose :as-child="true">
    <slot>
      <AppIconButton
        :label="t('shared.close')"
        icon="close"
        icon-size="default"
        variant="ghost"
      />
    </slot>
  </DialogClose>
</template>
