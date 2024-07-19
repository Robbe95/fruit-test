<script setup lang="ts">
import AppBreadcrumbDivider from '@base/components/core/breadcrumbs/AppBreadcrumbDivider.vue'
import AppBreadcrumbItem from '@base/components/core/breadcrumbs/AppBreadcrumbItem.vue'
import { useBreadcrumbsStyle } from '@base/components/core/breadcrumbs/breadcrumbs.style'
import type { BreadcrumbItem } from '@base/types/core/breadcrumbItem.type'
import { computed } from 'vue'

const props = defineProps<{
  /**
   * The items to display in the breadcrumb.
   */
  items: BreadcrumbItem[]
}>()

const breadcrumbsVariants = useBreadcrumbsStyle()
const breadcrumbsContainerClasses = computed<string>(() => breadcrumbsVariants.container())
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol :class="breadcrumbsContainerClasses">
      <template
        v-for="(item, i) of props.items"
        :key="i"
      >
        <AppBreadcrumbItem :item="item" />

        <AppBreadcrumbDivider v-if="i < props.items.length - 1" />
      </template>
    </ol>
  </nav>
</template>
