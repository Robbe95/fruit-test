<script setup lang="ts">
import type { registerFormSchema } from '@auth/models/register/registerForm.model'
import type { Form } from 'formango'

const { form } = defineProps<{
  form: Form<typeof registerFormSchema>
}>()
const { t } = useI18n()

const firstName = form.register('firstName')
const lastName = form.register('lastName')
const email = form.register('email')
const phone = form.register('phone', '+32')
</script>

<template>
  <AppFormGrid class="lg:grid-cols-1">
    <FormInput
      v-bind="firstName"
      :label="t('shared.first_name')"
      :placeholder="t('shared.first_name')"
      variant="auth"
    />
    <FormInput
      v-bind="lastName"
      :label="t('shared.last_name')"
      :placeholder="t('shared.last_name')"
      variant="auth"
    />
    <FormInput
      v-bind="email"
      :label="t('shared.email')"
      :placeholder="t('shared.email')"
      variant="auth"
    />
    <FormPhoneNumberInput
      v-bind="phone"
      :label="t('shared.phone')"
      :placeholder="t('placeholder.phone')"
      variant="auth"
    />
    <AppButton
      @click="form.submit"
    >
      {{ t('shared.send') }}
    </AppButton>
  </AppFormGrid>
</template>
