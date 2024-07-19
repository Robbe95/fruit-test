<script setup lang="ts"  generic="TValue extends AcceptableValue">
import { useCommandStyle } from '@base/components/core/command/command.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppText from '@base/components/core/text/AppText.vue'
import type { CommandItem } from '@base/types/core/commandItem.type'
import type { AcceptableValue } from '@base/types/core/selectItem.type'
import { ComboboxItem } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  item: CommandItem
}>()

const commandStyle = useCommandStyle()

const itemClasses = computed<string>(() => commandStyle.item())
const itemIconClasses = computed<string>(() => commandStyle.itemIcon())
const itemImgClasses = computed<string>(() => commandStyle.itemImg())
const itemTextClasses = computed<string>(() => commandStyle.itemText())
</script>

<template>
  <ComboboxItem
    :value="props.item.label"
    :class="itemClasses"
    @select="props.item.onSelect"
  >
    <AppIcon
      v-if="props.item.icon !== undefined"
      :icon="props.item.icon"
      :class="itemIconClasses"
    />

    <img
      v-if="props.item.image !== undefined"
      :src="props.item.image"
      :class="itemImgClasses"
      alt=""
    >

    <AppText
      :class="itemTextClasses"
      variant="subtext"
    >
      {{ props.item.label }}
    </AppText>
  </ComboboxItem>
</template>
