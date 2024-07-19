<script setup lang="ts">
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppLoader from '@base/components/core/loader/AppLoader.vue'
import { useSelectStyle } from '@base/components/core/select/select.style'
import type { Icon } from '@base/icons/icons'
import {
  ComboboxInput,
  ComboboxTrigger,
} from 'radix-vue'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  id: null | string
  isDisabled: boolean
  isEmpty: boolean
  isInvalid: boolean
  isLoading: boolean
  iconLeft: Icon | null
  placeholder: null | string
}>(), {})

const emit = defineEmits<{
  blur: []
  open: []
}>()

const isFocused = ref<boolean>(false)

function onSpace(): void {
  emit('open')
}

function onFocus(): void {
  isFocused.value = true
}

function onBlur(): void {
  isFocused.value = false
  emit('blur')
}

const selectStyle = useSelectStyle()

const multiInputContainerClasses = computed<string>(() => selectStyle.multiInputContainer({
  isDisabled: props.isDisabled,
  isInvalid: props.isInvalid,
}))
const inputClasses = computed<string>(() => selectStyle.input({ isEmpty: props.isEmpty }))
const loaderClasses = computed<string>(() => selectStyle.loader())
const multiTriggerClasses = computed<string>(() => selectStyle.multiTrigger({ isDisabled: props.isDisabled }))
const triggerIconClasses = computed<string>(() => selectStyle.triggerIcon())
const iconLeftClasses = computed<string>(() => selectStyle.iconLeft())
</script>

<template>
  <label
    :class="multiInputContainerClasses"
  >
    <slot name="left">
      <AppIcon
        v-if="props.iconLeft !== null && props.iconLeft !== undefined"
        :icon="props.iconLeft"
        :class="iconLeftClasses"
      />
    </slot>

    <ComboboxInput
      :id="props.id"
      :placeholder="props.placeholder"
      :readonly="true"
      :class="inputClasses"
      @blur="onBlur"
      @focus="onFocus"
      @keydown.enter.prevent
      @keydown.space.prevent="onSpace"
    />

    <AppLoader
      v-if="props.isLoading"
      :class="loaderClasses"
    />

    <ComboboxTrigger
      :class="multiTriggerClasses"
    >
      <AppIcon
        v-if="!props.isLoading"
        :class="triggerIconClasses"
        icon="chevronDown"
        size="sm"
      />
    </ComboboxTrigger>
  </label>
</template>
