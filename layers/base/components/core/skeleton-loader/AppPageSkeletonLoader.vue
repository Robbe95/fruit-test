<script setup lang="ts">
import AppContainer from '@base/components/core/container/AppContainer.vue'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppSkeletonLoaderButton from '@base/components/core/skeleton-loader/AppSkeletonLoaderButton.vue'
import AppSkeletonLoaderRow from '@base/components/core/skeleton-loader/AppSkeletonLoaderRow.vue'
import { useSkeletonLoaderStyle } from '@base/components/core/skeleton-loader/skeletonLoader.style'
import { computed } from 'vue'

const skeletonLoaderStyle = useSkeletonLoaderStyle()

const pageContainerClasses = computed<string>(() => skeletonLoaderStyle.pageContainer())
const pageContentContainerClasses = computed<string>(() => skeletonLoaderStyle.pageContentContainer())
const pageContentButtonClasses = computed<string>(() => skeletonLoaderStyle.pageContentButton())
const pageContentRowClasses = computed<string>(() => skeletonLoaderStyle.pageContentRow())
const pageHeaderContainerClasses = computed<string>(() => skeletonLoaderStyle.pageHeaderContainer())
const pageHeaderIconClasses = computed<string>(() => skeletonLoaderStyle.pageHeaderIcon())
const pageHeaderRowClasses = computed<string>(() => skeletonLoaderStyle.pageHeaderRow())
const pagePaddingClasses = computed<string>(() => skeletonLoaderStyle.pagePadding())
const pageFlexClasses = computed<string>(() => skeletonLoaderStyle.pageFlex())
</script>

<template>
  <div :class="pageContainerClasses">
    <AppContainer :class="pagePaddingClasses">
      <div :class="pageFlexClasses">
        <div :class="pageHeaderContainerClasses">
          <AppSkeletonLoaderRow :class="pageHeaderRowClasses" />

          <AppIcon
            :class="pageHeaderIconClasses"
            icon="chevronRight"
            size="sm"
          />

          <AppSkeletonLoaderRow :class="pageHeaderRowClasses" />
        </div>

        <div :class="pageContentContainerClasses">
          <AppSkeletonLoaderRow :class="pageContentRowClasses" />
          <AppSkeletonLoaderButton :class="pageContentButtonClasses" />
        </div>
      </div>
    </AppContainer>
  </div>
</template>
