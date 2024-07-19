<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="mb-12 flex flex-col gap-2">
    <h1 class="text-hero font-bold uppercase">
      {{ props.title }}
    </h1>
    <p>
      {{ props.subtitle }}
    </p>
  </div>
</template>
