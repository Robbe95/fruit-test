<script setup lang="ts">
import type { forgotPasswordFormSchema } from '@auth/models/forgot-password/forgotPasswordForm.model'
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  form: Form<typeof forgotPasswordFormSchema>
  lastLoginAttemptEmail: null | string
}>()

const { t } = useI18n()

const email = props.form.register('email', props.lastLoginAttemptEmail ?? undefined)
</script>

<template>
  <AppForm
    :form="form"
    :can-exit-when-dirty="true"
  >
    <FormInput
      v-bind="email"
      :is-required="true"
      :label="t('form.fields.email')"
      :placeholder="t('auth.forgot_password.email_placeholder')"
      type="email"
    />

    <AuthFormSubmitButton
      :form="form"
      :is-always-enabled="true"
      :label="t('auth.forgot_password.action')"
    />
  </AppForm>
</template>
