<script setup lang="ts" generic="TValue extends string">
import AppTagsInputItem from '@base/components/core/tags-input/AppTagsInputItem.vue'
import { useTagsInputStyle } from '@base/components/core/tags-input/tagsInput.style'
import {
  TagsInputInput,
  TagsInputRoot,
} from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  id?: null | string
  isDisabled?: boolean
  isInvalid?: boolean
  max?: null | number
  placeholder?: null | string
}>(), {
  id: null,
  isDisabled: false,
  isInvalid: false,
  max: null,
  placeholder: null,
})

const emit = defineEmits<{
  blur: []
  focus: []
}>()

const model = defineModel<TValue[]>({
  required: true,
})

function onFocus(): void {
  emit('focus')
}

function onBlur(): void {
  emit('blur')
}

const tagsInputStyle = useTagsInputStyle()

const containerClasses = computed<string>(() => tagsInputStyle.container({
  isInvalid: props.isInvalid,
  isModelEmpty: model.value.length === 0,
}))

const inputClasses = computed<string>(() => tagsInputStyle.input({
  isDisabled: props.isDisabled,
}))
</script>

<template>
  <TagsInputRoot
    v-model="model"
    :disabled="props.isDisabled"
    :add-on-paste="true"
    :max="props.max ?? undefined"
    :class="containerClasses"
  >
    <template
      v-for="tag of model"
      :key="tag"
    >
      <slot
        :value="tag"
        name="tag"
      >
        <AppTagsInputItem
          :value="tag"
          :display-fn="(tag) => tag"
          :is-disabled="props.isDisabled"
        />
      </slot>
    </template>

    <TagsInputInput
      :id="id"
      :placeholder="props.placeholder ?? undefined"
      :class="inputClasses"
      @focus="onFocus"
      @blur="onBlur"
    />
  </TagsInputRoot>
</template>
