<script setup lang="ts">
import { useDropdownMenuStyle } from '@base/components/core/dropdown-menu/dropdownMenu.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppKeyboardShortcut from '@base/components/core/keyboard/AppKeyboardShortcut.vue'
import AppText from '@base/components/core/text/AppText.vue'
import type { DropdownMenuRouteOption } from '@base/types/core/dropdownMenuItem.type'
import { DropdownMenuItem as RadixDropdownMenuItem } from 'radix-vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  item: DropdownMenuRouteOption
}>()

const dropdownMenuStyle = useDropdownMenuStyle()

const containerClasses = computed<string>(() => dropdownMenuStyle.itemContainer())
const contentClasses = computed<string>(() => dropdownMenuStyle.itemContent())
const iconClasses = computed<string>(() => dropdownMenuStyle.itemOptionIcon())
const textClasses = computed<string>(() => dropdownMenuStyle.itemText())
</script>

<template>
  <RadixDropdownMenuItem
    :as-child="true"
  >
    <RouterLink
      :to="props.item.to"
      :class="containerClasses"
    >
      <div :class="contentClasses">
        <AppIcon
          v-if="props.item.icon !== undefined"
          :icon="props.item.icon"
          :class="iconClasses"
          size="default"
        />

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
        class="ml-4"
      />
    </RouterLink>
  </RadixDropdownMenuItem>
</template>
