<script setup lang="ts">
import { NavigationMenuLink } from 'radix-vue'

import type { NavigationLink } from '~/types/navigation/navigationLink.type'

defineProps<NavigationLink>()
</script>

<template>
  <NavigationMenuLink as-child>
    <NuxtLinkLocale
      :to="to"
      active-class="link-active"
      class="group rounded text-subtext font-medium text-foreground focus-ring"
    >
      <div>
        <slot />
      </div>
      <div class="h-px w-full bg-transparent duration-200" />
    </NuxtLinkLocale>
  </NavigationMenuLink>
</template>
