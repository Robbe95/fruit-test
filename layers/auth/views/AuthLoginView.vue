<script setup lang="ts">
import type { CurrentUser } from '@auth/models/current-user/currentUser.model'
import { loginFormSchema } from '@auth/models/login/loginForm.model'
import { useAuthStore } from '@auth/stores/auth.store'
import { useToast } from '@base/composables/core/toast.composable'
import { isFetchError } from '@base/utils/api/isFetchError'
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const localeRoute = useLocaleRoute()
const { lastLoggedInUser } = storeToRefs(authStore)

const { t } = useI18n()
const toast = useToast()

const { form, onSubmitForm } = useForm({
  schema: loginFormSchema,
})

async function handleLoggedIn(user: CurrentUser): Promise<void> {
  authStore.setLastLoginAttemptEmail(null)
  authStore.setLastLoggedInUser(user)

  const path = localeRoute({
    path: '/',
  })

  await navigateTo(path)
}

function handleLoginError(error: unknown): void {
  if (isFetchError(error)) {
    form.addErrors({
      password: {
        _errors: [
          t('auth.login.invalid_email_or_password'),
        ],
      },
    })

    toast.error({
      title: t('auth.login.error_toast.title'),
      description: t('auth.login.error_toast.description'),
    })
  }
  else {
    throw error
  }
}

onSubmitForm(async (data) => {
  try {
    await authStore.login(data)

    const currentUser = await authStore.getCurrentUser()

    void handleLoggedIn(currentUser)
  }
  catch (error) {
    console.error('error', error)
    handleLoginError(error)
    authStore.setLastLoginAttemptEmail(data.email)
  }
})
</script>

<template>
  <AuthPage
    :title=" t('auth.login.title')"
    :description=" t('auth.login.description')"
  >
    <AuthLoginForm
      :form="form"
      :last-logged-in-user="lastLoggedInUser"
    />
    <I18nT
      keypath="auth.login.no_account"
      class="mt-4 text-center text-sm"
      tag="p"
    >
      <template #register_account>
        <NuxtLinkLocale
          :to="{
            name: 'auth-register',
          }"
          class="text-right font-medium text-primary hover:underline focus:underline"
        >
          <AppText
            variant="subtext"
            as="span"
          >
            {{ t('auth.login.register') }}
          </AppText>
        </NuxtLinkLocale>
      </template>
    </I18nT>
  </AuthPage>
</template>
