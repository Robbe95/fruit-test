<script setup lang="ts">
import { useTabsStyle } from '@base/components/core/tabs/tabs.style'
import type { TabItem } from '@base/types/core/tabItem.type'
import {
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  items: TabItem[]
}>()

const activeTabModel = defineModel<TabItem>('tab', {
  required: true,
})

const computedModel = computed<string>({
  get: () => activeTabModel.value.id,
  set: (value) => {
    activeTabModel.value = props.items.find((tab) => tab.id === value)!
  },
})

const tabsStyle = useTabsStyle()

const listClasses = computed<string>(() => tabsStyle.list())
const indicatorClasses = computed<string>(() => tabsStyle.indicator())
const triggerClasses = computed<string>(() => tabsStyle.trigger())
</script>

<template>
  <TabsRoot v-model="computedModel">
    <TabsList :class="listClasses">
      <TabsIndicator :class="indicatorClasses" />

      <TabsTrigger
        v-for="tab of items"
        :key="tab.label"
        :value="tab.id"
        :class="triggerClasses"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
  </TabsRoot>
</template>
