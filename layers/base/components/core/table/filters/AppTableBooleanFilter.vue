<script setup lang="ts" generic="TFilters">
import FormCheckbox from '@base/components/core/checkbox/FormCheckbox.vue'
import { useTableStyle } from '@base/components/core/table/table.style'
import type {
  Pagination,
  PaginationFilterBoolean,
  PaginationOptions,
  TableFilterEvent,
} from '@base/types/core/pagination.type'
import {
  computed,
  ref,
  watch,
} from 'vue'

const props = defineProps<{
  filter: PaginationFilterBoolean<TFilters>
  pagination: Pagination<TFilters>
}>()

const emit = defineEmits<{
  change: [event: TableFilterEvent<TFilters>]
}>()

const filterModel = ref<boolean>(getValue(props.pagination.paginationOptions.value))

function getValue(value: PaginationOptions<TFilters>): boolean {
  const data = value.filters?.[props.filter.id] ?? null

  if (data === null) {
    return false
  }

  return data === true
}

watch(
  () => props.pagination.paginationOptions.value,
  (value) => {
    filterModel.value = getValue(value)
  },
)

watch(
  () => filterModel.value,
  (value) => {
    emit('change', { key: props.filter.id, value })
  },
)

const tableStyle = useTableStyle()

const filterBooleanOptionClasses = computed<string>(() => tableStyle.filterBooleanOption())
</script>

<template>
  <div :class="filterBooleanOptionClasses">
    <FormCheckbox
      v-model="filterModel"
      :label="props.filter.label"
    />
  </div>
</template>
