<script setup lang="ts">
import { useBadgeStyle } from '@base/components/core/badge/badge.style'
import AppText from '@base/components/core/text/AppText.vue'
import { computed } from 'vue'

const badgeStyle = useBadgeStyle()
const badgeClasses = computed<string>(() => badgeStyle.badge())
</script>

<template>
  <div :class="badgeClasses">
    <AppText variant="caption">
      <slot />
    </AppText>
  </div>
</template>
