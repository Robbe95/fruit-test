<script setup lang="ts">
import { useDropdownMenuStyle } from '@base/components/core/dropdown-menu/dropdownMenu.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppText from '@base/components/core/text/AppText.vue'
import type { DropdownMenuSubMenu } from '@base/types/core/dropdownMenuItem.type'
import { DropdownMenuSubTrigger } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  item: DropdownMenuSubMenu
}>()

const dropdownMenuStyle = useDropdownMenuStyle()

const containerClasses = computed<string>(() => dropdownMenuStyle.itemContainer())
const contentClasses = computed<string>(() => dropdownMenuStyle.itemContent())
const iconClasses = computed<string>(() => dropdownMenuStyle.itemOptionIcon())
const textClasses = computed<string>(() => dropdownMenuStyle.itemText())
const triggerIconClasses = computed<string>(() => dropdownMenuStyle.itemSubTriggerIcon())
</script>

<template>
  <DropdownMenuSubTrigger :class="containerClasses">
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

    <span :class="triggerIconClasses">
      <AppIcon
        icon="chevronRight"
        size="sm"
      />
    </span>
  </DropdownMenuSubTrigger>
</template>
