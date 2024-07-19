<script setup lang="ts">
import { useFormErrorStyle } from '@base/components/core/form-error/formError.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppText from '@base/components/core/text/AppText.vue'
import AppCollapseTransition from '@base/components/core/transitions/AppCollapseTransition.vue'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import { computed } from 'vue'

const props = defineProps<{
  isVisible: boolean
  errors: FormFieldErrors
}>()

const formErrorStyle = useFormErrorStyle()

const textClasses = computed<string>(() => formErrorStyle.text())
const iconClasses = computed<string>(() => formErrorStyle.icon())
const containerClasses = computed<string>(() => formErrorStyle.container())
</script>

<template>
  <AppCollapseTransition :duration="0.2">
    <div v-if="props.errors !== undefined && props.isVisible">
      <div :class="containerClasses">
        <AppIcon
          :class="iconClasses"
          size="default"
          icon="warning"
        />

        <AppText
          :class="textClasses"
          variant="subtext"
        >
          {{ props.errors?._errors[0] }}
        </AppText>
      </div>
    </div>
  </AppCollapseTransition>
</template>
