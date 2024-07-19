<script setup lang="ts">
import type { CurrentUser } from '@auth/models/current-user/currentUser.model'
import { useAuthStore } from '@auth/stores/auth.store'
import { AppText } from '@wisemen/vue-core'
import { PopoverClose } from 'radix-vue'

const authStore = useAuthStore()
const { t } = useI18n()
const currentUser = computed<CurrentUser | null>(() => authStore.currentUser)

function onLogout() {
  void authStore.logout()
}
</script>

<template>
  <AppPopover
    v-if="currentUser"
    align="center"
    hide-arrow
  >
    <AppIconButton
      :label="t('shared.settings')"
      icon="profile"
      class="flex-none rounded-full"
    />
    <template #content>
      <AppCard class="min-w-80">
        <div class="flex flex-col gap-4">
          <AppText
            class="font-medium"
            variant="subtitle"
          >
            {{ t('shared.hello', { name: currentUser.firstName }) }}
          </AppText>

          <PopoverClose :as-child="true">
            <AppButton
              class="w-full"
              @click="onLogout"
            >
              {{ t('shared.logout') }}
            </AppButton>
          </PopoverClose>
        </div>
      </AppCard>
    </template>
  </AppPopover>
</template>
