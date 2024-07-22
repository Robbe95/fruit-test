<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="flex h-dvh w-dvw">
    <ClientOnly>
      <MapRender />
    </ClientOnly>
  </div>
</template>
