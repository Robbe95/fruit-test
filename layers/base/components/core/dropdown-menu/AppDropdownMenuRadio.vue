<script setup lang="ts">
import { useDropdownMenuStyle } from '@base/components/core/dropdown-menu/dropdownMenu.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppKeyboardShortcut from '@base/components/core/keyboard/AppKeyboardShortcut.vue'
import AppText from '@base/components/core/text/AppText.vue'
import type { DropdownMenuRadio } from '@base/types/core/dropdownMenuItem.type'
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
} from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  item: DropdownMenuRadio
}>()

const dropdownMenuStyle = useDropdownMenuStyle()

const containerClasses = computed<string>(() => dropdownMenuStyle.itemContainer())
const contentClasses = computed<string>(() => dropdownMenuStyle.itemContent())
const radioIndicatorContainerClasses = computed<string>(() => dropdownMenuStyle.itemRadioIndicatorContainer())
const radioIndicatorClasses = computed<string>(() => dropdownMenuStyle.itemRadioIndicator())
const textClasses = computed<string>(() => dropdownMenuStyle.itemText())
</script>

<template>
  <DropdownMenuRadioItem
    :value="JSON.stringify(props.item.value)"
    :class="containerClasses"
    @select.prevent
  >
    <div :class="contentClasses">
      <div :class="radioIndicatorContainerClasses">
        <DropdownMenuItemIndicator>
          <AppIcon
            :class="radioIndicatorClasses"
            icon="checkmark"
          />
        </DropdownMenuItemIndicator>
      </div>

      <Component
        :is="props.item.render()"
        v-if="props.item.render !== undefined"
      />

      <AppText
        v-else
        :class="textClasses"
        variant="subtext"
      >
        {{ props.item.label }}
      </AppText>
    </div>

    <AppKeyboardShortcut
      v-if="props.item.keyboardShortcutKeys !== undefined"
      :keys="props.item.keyboardShortcutKeys"
    />
  </DropdownMenuRadioItem>
</template>
