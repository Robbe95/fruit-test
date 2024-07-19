<script setup lang="ts">
import type { CurrentUser } from '@auth/models/current-user/currentUser.model'
import type { loginFormSchema } from '@auth/models/login/loginForm.model'
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  form: Form<typeof loginFormSchema>
  lastLoggedInUser: CurrentUser | null
}>()

const { t } = useI18n()

const email = props.form.register('email', props.lastLoggedInUser?.email)
const password = props.form.register('password')
</script>

<template>
  <AppForm
    :form="form"
    :can-exit-when-dirty="true"
  >
    <AppFormElementSpacer>
      <FormInput
        v-bind="email"
        :is-required="true"
        :label="t('form.fields.email')"
        placeholder="email@example.com"
        type="email"
      />

      <FormPasswordInput
        v-bind="password"
        :is-required="true"
        :label="t('form.fields.password')"
        :placeholder="t('form.fields.password')"
      />

      <NuxtLinkLocale
        :to="{
          name: 'auth-forgot-password',
        }"
      >
        <AppText
          class="font-medium text-primary hover:underline focus:underline"
          variant="subtext"
        >
          {{ t('auth.login.forgot_password') }}
        </AppText>
      </NuxtLinkLocale>
    </AppFormElementSpacer>

    <AuthFormSubmitButton
      :label="t('auth.login.log_in')"
      :form="form"
    />
  </AppForm>
</template>
