<script setup lang="ts">
interface NuxtError {
  data: any
  description: string
  message: string
  statusCode: number
  statusMessage: string
  url: string
}

const props = defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <NuxtLayout>
    <div>
      <h2>{{ props.error.statusCode ?? 404 }}</h2>
      <p>{{ props.error.message ?? 'Page not found' }}</p>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
