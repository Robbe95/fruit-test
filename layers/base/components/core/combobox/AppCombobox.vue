<script setup lang="ts" generic="TValue extends AcceptableValue">
import AppComboboxContent from '@base/components/core/combobox/AppComboboxContent.vue'
import AppComboboxEmpty from '@base/components/core/combobox/AppComboboxEmpty.vue'
import AppComboboxInput from '@base/components/core/combobox/AppComboboxInput.vue'
import AppComboboxItem from '@base/components/core/combobox/AppComboboxItem.vue'
import AppComboboxViewport from '@base/components/core/combobox/AppComboboxViewport.vue'
import { useCombobox } from '@base/components/core/combobox/combobox.composable'
import { useComboboxStyle } from '@base/components/core/combobox/combobox.style'
import type { Icon } from '@base/icons/icons'
import type { ComboboxItem } from '@base/types/core/comboboxItem.type'
import type { ComboboxProps } from '@base/types/core/comboboxProps.type'
import type { AcceptableValue } from '@base/types/core/selectItem.type'
import {
  ComboboxAnchor,
  ComboboxArrow,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
} from 'radix-vue'
import {
  computed,
  ref,
  watch,
} from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * The html id of the combobox.
     */
    id?: null | string
    /**
     * Whether to show the search input in the dropdown instead of inline.
     * @default false
     */
    hasSearchInDropdown?: boolean
    /**
     * Whether the chevron icon is hidden.
     * @default false
     */
    isChevronHidden?: boolean
    /**
     * Whether the combobox is disabled.
     * @default false
     */
    isDisabled?: boolean
    /**
     * Whether the combobox is in an invalid state.
     * @default false
     */
    isInvalid?: boolean
    /**
     * Whether the combobox is loading.
     * @default false
     */
    isLoading?: boolean
    /**
     * Display function for the selected value
     */
    displayFn: (value: TValue) => string
    /**
     * The text to display when there are no options.
     * @default t('components.combobox.empty')
     */
    emptyText?: null | string
    /**
     * The function to filter the options.
     */
    filterFn: (options: TValue[], searchTerm: string) => TValue[]
    /**
     * The icon to display on the left side of the combobox.
     * @default null
     */
    iconLeft?: Icon | null
    /**
     * The icon to display on the right side of the combobox.
     * @default null
     */
    iconRight?: Icon | null
    /**
     * The options to display in the combobox.
     */
    items: ComboboxItem<TValue>[]
    /**
     * The value of the combobox.
     */
    modelValue: TValue | null
    /**
     * The placeholder text to display when the combobox is empty.
     * @default null
     */
    placeholder?: null | string
    /**
     * The props of the popover.
     * @default null
     */
    popoverProps?: ComboboxProps['popoverProps']
  }>(),
  {
    id: null,
    hasSearchInDropdown: false,
    isChevronHidden: false,
    isDisabled: false,
    isInvalid: false,
    isLoading: false,
    emptyText: null,
    iconLeft: undefined,
    iconRight: undefined,
    placeholder: null,
    popoverProps: null,
  },
)

const emit = defineEmits<{
  'blur': []
  'update:modelValue': [value: TValue | null]
}>()

const searchModel = defineModel<null | string>('search', {
  default: '',
  required: false,
})

const comboboxStyle = useComboboxStyle()

const dropdownSearchStyle = computed<string>(() => comboboxStyle.dropdownSearch())

const isOpen = ref<boolean>(false)
const inputRef = ref<InstanceType<typeof AppComboboxInput> | null>(null)

const model = computed<TValue | undefined>({
  get: () => props.modelValue ?? undefined,
  set: (value) => {
    emit('update:modelValue', value ?? null)
  },
})

const search = computed<string | undefined>({
  get: () => searchModel.value ?? undefined,
  set: (value) => {
    searchModel.value = value ?? null
  },
})

const { canOpenDropdown } = useCombobox({
  isLoading: computed<boolean>(() => props.isLoading),
  items: computed<ComboboxItem<TValue>[]>(() => props.items),
  search: computed<null | string>(() => searchModel.value),
})

const placeholderValue = computed<null | string>(() => {
  if (model.value === undefined) {
    return props.placeholder
  }

  return props.displayFn(model.value as TValue)
})

function onBlur(): void {
  emit('blur')
}

// When the search input is in the dropdown, we want to focus the "fake" input
// when the dropdown closes
watch(isOpen, (isOpen) => {
  if (isOpen || !props.hasSearchInDropdown) {
    return
  }

  const input = inputRef.value?.$el ?? null

  if (input !== null) {
    input.focus()
  }
})
</script>

<template>
  <div>
    <ComboboxRoot
      v-model="model"
      v-model:open="isOpen"
      v-model:search-term="search"
      :filter-function="(props.filterFn as any)"
      :display-value="displayFn"
      :disabled="props.isDisabled"
    >
      <ComboboxAnchor>
        <AppComboboxInput
          :id="props.id"
          ref="inputRef"
          :value="model ?? null"
          :icon-left="props.iconLeft ?? null"
          :icon-right="props.iconRight ?? null"
          :is-chevron-hidden="props.isChevronHidden"
          :display-fn="props.displayFn"
          :is-open="isOpen"
          :is-disabled="props.isDisabled"
          :is-invalid="props.isInvalid"
          :is-loading="props.isLoading"
          :placeholder="placeholderValue"
          :has-search-in-dropdown="props.hasSearchInDropdown"
          @blur="onBlur"
        >
          <template #left>
            <slot name="left" />
          </template>

          <template #right>
            <slot name="right" />
          </template>
        </AppComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <Transition
          enter-active-class="duration-150"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-150"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isOpen && canOpenDropdown"
            class="z-popover"
          >
            <AppComboboxContent :popover-props="props.popoverProps">
              <AppComboboxViewport>
                <ComboboxInput
                  v-if="props.hasSearchInDropdown"
                  :placeholder="props.placeholder"
                  :class="dropdownSearchStyle"
                />

                <AppComboboxEmpty :empty-text="props.emptyText">
                  <slot name="empty" />
                </AppComboboxEmpty>

                <AppComboboxItem
                  v-for="item of props.items"
                  :key="JSON.stringify(item)"
                  :item="item"
                  :is-multiple="false"
                  :display-fn="props.displayFn"
                >
                  <template #default="{ item: itemValue }">
                    <slot
                      v-if="itemValue.type === 'option'"
                      :value="itemValue.value"
                      name="option"
                    />
                  </template>
                </AppComboboxItem>
              </AppComboboxViewport>

              <ComboboxArrow />
            </AppComboboxContent>
          </div>
        </Transition>
      </ComboboxPortal>
    </ComboboxRoot>
  </div>
</template>
