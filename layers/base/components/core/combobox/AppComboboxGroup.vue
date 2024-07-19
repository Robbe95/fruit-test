<script setup lang="ts">
import { useComboboxStyle } from '@base/components/core/combobox/combobox.style'
import AppText from '@base/components/core/text/AppText.vue'
import { ComboboxGroup, ComboboxLabel } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  label: string
}>()

const comboboxStyle = useComboboxStyle()
const groupText = computed<string>(() => comboboxStyle.groupText())
</script>

<template>
  <ComboboxGroup>
    <ComboboxLabel class="px-2 py-1">
      <AppText
        :class="groupText"
        variant="caption"
      >
        {{ props.label }}
      </AppText>
    </ComboboxLabel>

    <div class="pl-2">
      <slot />
    </div>
  </ComboboxGroup>
</template>
