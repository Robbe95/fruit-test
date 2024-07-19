<script setup lang="ts">
import AppText from '@base/components/core/text/AppText.vue'
import { ComboboxEmpty } from 'radix-vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  emptyText: null | string
}>()

const { t } = useI18n()
</script>

<template>
  <ComboboxEmpty>
    <slot>
      <AppText
        variant="subtext"
        class="p-2"
      >
        {{ props.emptyText ?? t('components.combobox.empty') }}
      </AppText>
    </slot>
  </ComboboxEmpty>
</template>
