<script setup lang="ts">
import { useAuthRegister } from '@auth/api/mutations/useAuthRegister'
import { registerFormSchema } from '@auth/models/register/registerForm.model'
import AppCollapseTransition from '@base/components/core/transitions/AppCollapseTransition.vue'
import { useToast } from '@base/composables/core/toast.composable'
import { useForm } from 'formango'

const { t } = useI18n()
const register = useAuthRegister()
const toast = useToast()
const { form, onSubmitForm } = useForm({
  schema: registerFormSchema,
})
const hasSubmitted = ref<boolean>(false)

onSubmitForm(async (data) => {
  try {
    await register.mutateAsync(data)
    hasSubmitted.value = true
  }
  catch (error) {
    toast.error({
      title: t('auth.register.error_title'),
      description: t('auth.register.error_description'),
    })
  }
})
</script>

<template>
  <AuthPage
    :title=" t('auth.register.title')"
    :description=" t('auth.register.description')"
  >
    <AppCollapseTransition>
      <AuthRegisterForm
        v-if="!hasSubmitted"
        :form="form"
      />
      <div v-else>
        <AppBox
          icon="checkmarkCircle"
        >
          <template #front>
            <AppText
              variant="body"
            >
              {{ t('auth.register.register_success_title') }}
            </AppText>
            <AppText
              class="text-neutral-400"
              variant="subtext"
            >
              {{ t('auth.register.register_success_description') }}
            </AppText>
          </template>
        </AppBox>
      </div>
    </AppCollapseTransition>
    <AppText
      class="mt-4 flex flex-row flex-wrap items-center justify-center gap-x-1 text-foreground"
      variant="subtext"
    >
      <span>
        {{ t('auth.register.already_have_account') }}
      </span>
      <NuxtLinkLocale
        to="/auth/login"
        class="rounded text-primary focus-ring hover:underline focus:underline"
      >
        {{ t('auth.register.login') }}
      </NuxtLinkLocale>
    </AppText>
  </AuthPage>
</template>
