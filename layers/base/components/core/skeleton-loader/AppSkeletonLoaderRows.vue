<script setup lang="ts">
import AppSkeletonLoaderRow from '@base/components/core/skeleton-loader/AppSkeletonLoaderRow.vue'
import { useSkeletonLoaderStyle } from '@base/components/core/skeleton-loader/skeletonLoader.style'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    rows?: number
  }>(),
  {
    rows: 3,
  },
)

const skeletonLoaderStyle = useSkeletonLoaderStyle()

const rowContainer = computed<string>(() => skeletonLoaderStyle.rowContainer())
</script>

<template>
  <div :class="rowContainer">
    <AppSkeletonLoaderRow
      v-for="i in props.rows"
      :key="i"
    />
  </div>
</template>
