<script setup lang="ts">
import { useSkeletonLoaderStyle } from '@base/components/core/skeleton-loader/skeletonLoader.style'
import { computed } from 'vue'

const skeletonLoaderStyle = useSkeletonLoaderStyle()

const buttonClasses = computed<string>(() => skeletonLoaderStyle.button())
</script>

<template>
  <div :class="buttonClasses" />
</template>
