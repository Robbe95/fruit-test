<script setup lang="ts">
import { useToast } from '@base/composables/core/toast.composable'
import { ConfigProvider } from 'radix-vue'

function useIdFunction() {
  return useId()
}

// If you want to use it in setup, import from the nuxtApp.
const pwa = useNuxtApp().$pwa

const toast = useToast()

onMounted(() => {
  if (pwa == null) {
    return
  }

  console.log(pwa)

  if (pwa.offlineReady) {
    toast.success({
      title: 'You are offline',
    })
  }
})
</script>

<template>
  <SeoWrapper>
    <div v-show="pwa?.needRefresh">
      <span>
        New content available, click on reload button to update.
      </span>

      <button @click="pwa?.updateServiceWorker()">
        Reload
      </button>
    </div>

    <NuxtPwaManifest />

    <div class="flex w-screen flex-1">
      <div class="w-full">
        <ConfigProvider :use-id="useIdFunction">
          <NuxtLoadingIndicator color="#E94935" />
          <NuxtLayout>
            {{ pwa?.offlineReady ?? '/' }}

            <NuxtPage />
          </NuxtLayout>
          <Teleport to="#teleports">
            <AppDialogContainer />
            <AppToastContainer />
          </Teleport>
        </ConfigProvider>
      </div>
    </div>
  </SeoWrapper>
</template>
