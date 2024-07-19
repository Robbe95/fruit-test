<script setup lang="ts">
import AppIconButton from '@base/components/core/button/AppIconButton.vue'
import FormElement from '@base/components/core/form-element/FormElement.vue'
import AppInput from '@base/components/core/input/AppInput.vue'
import { useInputStyle } from '@base/components/core/input/input.style'
import AppToggle from '@base/components/core/toggle/AppToggle.vue'
import type { Icon } from '@base/icons/icons'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    /**
     * Whether the input is disabled.
     */
    isDisabled?: boolean
    /**
     * Whether the input is loading.
     * @default false
     */
    isLoading?: boolean
    /**
     *  Whether the input is required.
     */
    isRequired?: boolean
    /**
     * Whether the input is touched.
     */
    isTouched: boolean
    /**
     * The errors associated with the input.
     */
    errors: FormFieldErrors
    /**
     * The left icon of the input.
     * @default null
     */
    iconLeft?: Icon | null
    /**
     * The label of the input.
     */
    label: string
    /**
     * The placeholder of the input.
     * @default null
     */
    placeholder?: null | string
  }>(),
  {
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    iconLeft: undefined,
    placeholder: null,
  },
)

const emit = defineEmits<{
  blur: []
  focus: []
}>()

const model = defineModel<null | string>({
  required: true,
})

const isPasswordVisible = ref<boolean>(false)

const { t } = useI18n()

const inputType = computed<'password' | 'text'>(() => {
  return isPasswordVisible.value ? 'text' : 'password'
})

function onFocus(): void {
  emit('focus')
}

function onBlur(): void {
  emit('blur')
}

const inputStyle = useInputStyle()

const passwordIconClasses = computed<string>(() => inputStyle.passwordIcon())
</script>

<template>
  <FormElement
    v-slot="{ isInvalid, id }"
    :errors="props.errors"
    :is-required="props.isRequired"
    :is-touched="props.isTouched"
    :is-disabled="props.isDisabled"
    :label="props.label"
  >
    <AppInput
      :id="id"
      v-model="model"
      :type="inputType"
      :is-disabled="props.isDisabled"
      :is-invalid="isInvalid"
      :placeholder="props.placeholder"
      :icon-left="props.iconLeft ?? undefined"
      :is-loading="props.isLoading"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template #right>
        <AppToggle
          v-model:is-toggled="isPasswordVisible"
          :is-disabled="props.isDisabled"
        >
          <template #default="{ isToggled }">
            <AppIconButton
              :icon="isToggled
                ? 'eyeSlash'
                : 'eye'"
              :label="isToggled
                ? t('components.password_input.hide_password')
                : t('components.password_input.show_password')"
              :class="passwordIconClasses"
              tabindex="-1"
              size="sm"
              variant="ghost"
            />
          </template>
        </AppToggle>
      </template>
    </AppInput>
  </FormElement>
</template>
