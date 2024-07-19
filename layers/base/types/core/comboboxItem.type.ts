import type {
  AcceptableValue,
  SelectItem,
  SelectItemOption,
} from '@base/types/core/selectItem.type'

export type ComboboxItemOption<TValue extends AcceptableValue> = SelectItemOption<TValue>

export type ComboboxItem<TValue extends AcceptableValue> = SelectItem<TValue>
