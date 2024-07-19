<script setup lang="ts" generic="TValue extends AcceptableValue">
import { useComboboxStyle } from '@base/components/core/combobox/combobox.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppText from '@base/components/core/text/AppText.vue'
import type { ComboboxItemOption } from '@base/types/core/comboboxItem.type'
import type { AcceptableValue } from '@base/types/core/selectItem.type'
import {
  ComboboxItem as RadixComboboxItem,
  ComboboxItemIndicator,
} from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  displayFn: (value: TValue) => string
  item: ComboboxItemOption<TValue>
}>()

const comboboxStyle = useComboboxStyle()

const containerClasses = computed<string>(() => comboboxStyle.multiOptionContainer())
const indicatorContainerClasses = computed<string>(() => comboboxStyle.multiOptionIndicatorContainer())
const optionSpacer = computed<string>(() => comboboxStyle.multiOptionSpacer())
const indicatorClasses = computed<string>(() => comboboxStyle.multiOptionIndicator())
</script>

<template>
  <RadixComboboxItem
    :disabled="props.item.isDisabled === true"
    :value="props.item.value"
    :class="containerClasses"
  >
    <div :class="optionSpacer">
      <div :class="indicatorContainerClasses">
        <ComboboxItemIndicator>
          <AppIcon
            :class="indicatorClasses"
            icon="checkmark"
            size="sm"
          />
        </ComboboxItemIndicator>
      </div>

      <slot>
        <AppText variant="subtext">
          {{ props.displayFn(props.item.value) }}
        </AppText>
      </slot>
    </div>
  </RadixComboboxItem>
</template>
