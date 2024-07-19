<script setup lang="ts" generic="TValue extends AcceptableValue">
import AppComboboxDivider from '@base/components/core/combobox/AppComboboxDivider.vue'
import AppComboboxGroup from '@base/components/core/combobox/AppComboboxGroup.vue'
import AppComboboxOption from '@base/components/core/combobox/AppComboboxOption.vue'
import AppMultiComboboxOption from '@base/components/core/combobox/AppMultiComboboxOption.vue'
import type { ComboboxItem } from '@base/types/core/comboboxItem.type'
import type { AcceptableValue } from '@base/types/core/selectItem.type'

const props = defineProps<{
  isMultiple: boolean
  displayFn: (value: TValue) => string
  item: ComboboxItem<TValue>
}>()
</script>

<template>
  <AppComboboxDivider v-if="props.item.type === 'divider'" />

  <AppComboboxGroup
    v-else-if="props.item.type === 'group'"
    :label="props.item.label"
  >
    <AppComboboxItem
      v-for="(groupItem, i) of props.item.items"
      :key="i"
      :item="groupItem"
      :is-multiple="props.isMultiple"
      :display-fn="props.displayFn"
    >
      <!-- @vue-expect-error -->
      <template #default="{ item: itemValue }">
        <slot :item="itemValue" />
      </template>
    </AppComboboxItem>
  </AppComboboxGroup>

  <AppComboboxOption
    v-else-if="props.item.type === 'option' && !isMultiple"
    :item="props.item"
    :display-fn="props.displayFn"
  >
    <slot :item="props.item" />
  </AppComboboxOption>

  <AppMultiComboboxOption
    v-else-if="props.item.type === 'option' && isMultiple"
    :item="props.item"
    :display-fn="props.displayFn"
  >
    <slot :item="props.item" />
  </AppMultiComboboxOption>
</template>
