<script setup lang="ts" generic="TValue extends AcceptableValue">
import AppCommandItem from '@base/components/core/command/AppCommandItem.vue'
import { useCommandStyle } from '@base/components/core/command/command.style'
import type { CommandItem } from '@base/types/core/commandItem.type'
import type { AcceptableValue } from '@base/types/core/selectItem.type'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxRoot,
  ComboboxViewport,
} from 'radix-vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  /**
   * The items to display in the combobox.
   */
  items: CommandItem[]
  /**
   * The placeholder of the combobox.
   */
  placeholder: string
}>()

const search = ref<string>('')

const commandStyle = useCommandStyle()

const containerClasses = computed<string>(() => commandStyle.container())
const inputClasses = computed<string>(() => commandStyle.input())
</script>

<template>
  <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
  <div>
    <ComboboxRoot
      v-model:search-term="search"
      :open="true"
      :class="containerClasses"
      model-value=""
    >
      <ComboboxAnchor>
        <ComboboxInput
          :auto-focus="true"
          :placeholder="placeholder"
          :class="inputClasses"
        />
      </ComboboxAnchor>

      <ComboboxContent :force-mount="true">
        <ComboboxViewport>
          <ComboboxEmpty>
            Empty
          </ComboboxEmpty>

          <div class="p-2">
            <AppCommandItem
              v-for="item of props.items"
              :key="item.label"
              :item="item"
            />
          </div>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxRoot>
  </div>
</template>
