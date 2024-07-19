<script setup lang="ts" generic="TValue extends AcceptableValue">
import AppIconButton from '@base/components/core/button/AppIconButton.vue'
import { useTagsInputStyle } from '@base/components/core/tags-input/tagsInput.style'
import AppText from '@base/components/core/text/AppText.vue'
import type { AcceptableValue } from '@base/types/core/selectItem.type'
import {
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  displayFn: (value: TValue) => string
  value: TValue
}>(), {
  isDisabled: false,
})

const tagsInputStyle = useTagsInputStyle()

const itemContainerClasses = computed<string>(() => tagsInputStyle.itemContainer({
  isDisabled: props.isDisabled,
}))
const itemTextClasses = computed<string>(() => tagsInputStyle.itemText())
const itemDeleteButtonClasses = computed<string>(() => tagsInputStyle.itemDeleteButton())
</script>

<template>
  <TagsInputItem
    :disabled="props.isDisabled"

    :value="(props.value as any)"
    :class="itemContainerClasses"
  >
    <TagsInputItemText :as-child="true">
      <AppText
        :class="itemTextClasses"
        variant="subtext"
      >
        {{ props.displayFn(props.value) }}
      </AppText>
    </TagsInputItemText>

    <TagsInputItemDelete :as-child="true">
      <AppIconButton
        :is-disabled="props.isDisabled"
        :class="itemDeleteButtonClasses"
        icon="close"
        size="xs"
        variant="ghost"
        label="Delete"
      />
    </TagsInputItemDelete>
  </TagsInputItem>
</template>
