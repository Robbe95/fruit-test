<script setup lang="ts">
import {
  NavigationMenuList,
  NavigationMenuRoot,
} from 'radix-vue'

import { HEADER_LINKS } from '~/constants/header/headerLinks.constant'
</script>

<template>
  <NavigationMenuRoot>
    <NavigationMenuList
      class="flex items-center gap-3"
    >
      <template
        v-for="menuItem in HEADER_LINKS"
        :key="menuItem.title"
      >
        <HeaderNavigationMenuLink v-bind="menuItem">
          {{ menuItem.title }}
        </HeaderNavigationMenuLink>
        <HeaderNavigationMenuSpacer class="last:hidden" />
      </template>
    </NavigationMenuList>
  </NavigationMenuRoot>
</template>
