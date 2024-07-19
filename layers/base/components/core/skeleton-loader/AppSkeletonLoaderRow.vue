<script setup lang="ts">
import { useSkeletonLoaderStyle } from '@base/components/core/skeleton-loader/skeletonLoader.style'
import { computed } from 'vue'

const skeletonLoaderStyle = useSkeletonLoaderStyle()

const rowClasses = computed<string>(() => skeletonLoaderStyle.row())
</script>

<template>
  <div :class="rowClasses" />
</template>
