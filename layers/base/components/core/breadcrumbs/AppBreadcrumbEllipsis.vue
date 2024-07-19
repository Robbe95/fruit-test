<script setup lang="ts">
import AppButton from '@base/components/core/button/AppButton.vue'
import AppDropdownMenu from '@base/components/core/dropdown-menu/AppDropdownMenu.vue'
import type { BreadcrumbEllipsis } from '@base/types/core/breadcrumbItem.type'
import type { DropdownMenuItem } from '@base/types/core/dropdownMenuItem.type'
import { useRouter } from 'vue-router'

const props = defineProps<{
  item: BreadcrumbEllipsis
}>()

const router = useRouter()

const dropdownMenuItems: DropdownMenuItem[] = [
  {
    items: props.item.items.map((item) => ({
      label: item.label ?? '',
      type: 'option',
      onSelect: (): void => {
        void router.push(item.to)
      },
    })),
    type: 'group',
  },
]
</script>

<template>
  <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
  <AppDropdownMenu
    :items="dropdownMenuItems"
    :has-arrow="true"
  >
    <AppButton
      variant="ghost"
      size="sm"
    >
      ...
    </AppButton>
  </AppDropdownMenu>
</template>
