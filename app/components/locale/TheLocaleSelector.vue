<script setup lang="ts">
import { translateLocale } from '@base/translations/locale.translate'
import type { DropdownMenuItem } from '@base/types/core/dropdownMenuItem.type'
import type { LocaleObject } from '@nuxtjs/i18n'
import { AppIcon } from '@wisemen/vue-core'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed<LocaleObject[]>(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})

const dropdownItems = computed<DropdownMenuItem[]>(() => {
  return availableLocales.value.map((i) => ({
    label: translateLocale(i.code),
    type: 'option',
    onSelect: () => {
      void navigateTo(switchLocalePath(i.code))
    },
  }))
})
</script>

<template>
  <AppDropdownMenu
    :items="dropdownItems"
  >
    <button class="flex items-center gap-1 px-2 py-1 font-medium uppercase text-foreground">
      <span>
        {{ locale }}
      </span>
      <AppIcon
        icon="chevronDown"
      />
    </button>
  </AppDropdownMenu>
</template>
