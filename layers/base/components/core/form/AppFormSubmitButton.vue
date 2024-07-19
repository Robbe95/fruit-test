<script setup lang="ts" generic="TFormType extends z.ZodType">
import type AppButton from '@base/components/core/button/AppButton.vue'
import type { ButtonStyleProps } from '@base/components/core/button/button.style'
import { useKeyboardShortcut } from '@base/composables/core/keyboardShortcut.composable'
import type { Form } from 'formango'
import { computed, ref } from 'vue'
import type { z } from 'zod'

const props = withDefaults(defineProps<{
  formId?: null | string
  isAlwaysEnabled?: boolean
  isDisabled?: boolean
  isKeyboardCommandDisabled?: boolean
  form: Form<TFormType>
  variant?: ButtonStyleProps['variant']
}>(), {
  formId: null,
  isAlwaysEnabled: false,
  isDisabled: false,
  isKeyboardCommandDisabled: false,
  variant: 'default',
})

const buttonRef = ref<InstanceType<typeof AppButton> | null>(null)

const isButtonDisabled = computed<boolean>(() => {
  if (props.isDisabled) {
    return true
  }

  if (!props.isAlwaysEnabled) {
    return !(props.form.isDirty as boolean)
  }

  return false
})

function initKeyboardCommand(): void {
  if (props.isKeyboardCommandDisabled) {
    return
  }

  useKeyboardShortcut({
    keys: [
      'ctrl',
      's',
    ],
    onTrigger: () => {
      if (props.form.isDirty) {
        buttonRef.value?.$el.click()
      }
    },
  })
}

onMounted(() => {
  initKeyboardCommand()
})
</script>

<template>
  <div class="w-full">
    <AppTooltip
      :is-hidden="props.isKeyboardCommandDisabled"
      :disable-hoverable-content="true"
      :delay-duration="300"
      side="bottom"
    >
      <AppButton
        ref="buttonRef"
        :variant="variant"
        :form="props.formId"
        :is-disabled="isButtonDisabled"
        :is-loading="props.form.isSubmitting"
        type="submit"
        class="w-full"
      >
        <slot />
      </AppButton>

      <template #content>
        <div class="px-3 py-2">
          <AppKeyboardShortcut
            v-if="!props.isKeyboardCommandDisabled"
            :keys="['ctrl', 's']"
            :has-border="true"
            command-type="combination"
          />
        </div>
      </template>
    </AppTooltip>
  </div>
</template>
