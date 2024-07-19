<script setup lang="ts">
import { useDialogStyle } from '@base/components/core/dialog/dialog.style'
import { DialogOverlay } from 'radix-vue'
import { computed } from 'vue'

const dialogStyle = useDialogStyle()
const overlayClasses = computed<string>(() => dialogStyle.overlay())
</script>

<template>
  <DialogOverlay
    :force-mount="true"
    :class="overlayClasses"
  />
</template>
