<script setup lang="ts">
import AppDropdownMenuCheckbox from '@base/components/core/dropdown-menu/AppDropdownMenuCheckbox.vue'
import AppDropdownMenuDivider from '@base/components/core/dropdown-menu/AppDropdownMenuDivider.vue'
import AppDropdownMenuGroup from '@base/components/core/dropdown-menu/AppDropdownMenuGroup.vue'
import AppDropdownMenuLabel from '@base/components/core/dropdown-menu/AppDropdownMenuLabel.vue'
import AppDropdownMenuOption from '@base/components/core/dropdown-menu/AppDropdownMenuOption.vue'
import AppDropdownMenuRadioGroup from '@base/components/core/dropdown-menu/AppDropdownMenuRadioGroup.vue'
import AppDropdownMenuRouteOption from '@base/components/core/dropdown-menu/AppDropdownMenuRouteOption.vue'
import AppDropdownMenuSub from '@base/components/core/dropdown-menu/AppDropdownMenuSub.vue'
import AppDropdownMenuSubContent from '@base/components/core/dropdown-menu/AppDropdownMenuSubContent.vue'
import AppDropdownMenuSubTrigger from '@base/components/core/dropdown-menu/AppDropdownMenuSubTrigger.vue'
import type { DropdownMenuItem } from '@base/types/core/dropdownMenuItem.type'
import { DropdownMenuPortal } from 'radix-vue'

const props = defineProps<{
  item: DropdownMenuItem
}>()
</script>

<template>
  <AppDropdownMenuDivider v-if="props.item.type === 'divider'" />

  <AppDropdownMenuGroup v-else-if="props.item.type === 'group'">
    <AppDropdownMenuItem
      v-for="(groupItem, i) of props.item.items"
      :key="i"
      :item="groupItem"
    />
  </AppDropdownMenuGroup>

  <AppDropdownMenuSub v-else-if="props.item.type === 'subMenu'">
    <AppDropdownMenuSubTrigger :item="props.item" />

    <DropdownMenuPortal>
      <AppDropdownMenuSubContent>
        <AppDropdownMenuItem
          v-for="(subItem, i) of props.item.items"
          :key="i"
          :item="subItem"
        />
      </AppDropdownMenuSubContent>
    </DropdownMenuPortal>
  </AppDropdownMenuSub>

  <AppDropdownMenuCheckbox
    v-else-if="props.item.type === 'checkbox'"
    :item="props.item"
  />

  <AppDropdownMenuRadioGroup
    v-else-if="props.item.type === 'radioGroup'"
    :item="props.item"
  />

  <AppDropdownMenuRouteOption
    v-else-if="props.item.type === 'routeOption'"
    :item="props.item"
  >
    <slot :item="props.item" />
  </AppDropdownMenuRouteOption>

  <AppDropdownMenuOption
    v-else-if="props.item.type === 'option'"
    :item="props.item"
  >
    <slot :item="props.item" />
  </AppDropdownMenuOption>

  <AppDropdownMenuLabel
    v-else-if="props.item.type === 'label'"
    :label="props.item.label"
  />
</template>
