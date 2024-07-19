import type { Icon } from '@base/icons/icons'
import type { KeyboardKey } from '@base/types/core/keyboard.type'
import type { AcceptableValue } from '@base/types/core/selectItem.type'
import type {
  Ref,
  VNode,
} from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export interface DropdownMenuDivider {
  type: 'divider'
}

export interface DropdownMenuLabel {
  label: string
  type: 'label'
}

export interface DropdownMenuSubMenu {
  icon?: Icon
  items: DropdownMenuItem[]
  label: string
  render?: () => VNode
  type: 'subMenu'
}

export interface DropdownMenuGroup {
  items: DropdownMenuItem[]
  type: 'group'
}

interface DropdownMenuBaseOption {
  icon?: Icon
  keyboardShortcutKeys?: KeyboardKey[]
  label: string
  render?: () => VNode
}

export interface DropdownMenuSelectOption extends DropdownMenuBaseOption {
  type: 'option'
  onSelect: () => void
}

export interface DropdownMenuRouteOption extends DropdownMenuBaseOption {
  target?: string
  to: RouteLocationRaw
  type: 'routeOption'
}

export type DropdownMenuOption = DropdownMenuRouteOption | DropdownMenuSelectOption

export interface DropdownMenuCheckbox {
  isSelected: Ref<boolean>
  keyboardShortcutKeys?: KeyboardKey[]
  label: string
  render?: () => VNode
  type: 'checkbox'
  onSelect: () => void
}

export interface DropdownMenuRadioGroup {
  items: DropdownMenuRadio[]
  modelValue: Ref<AcceptableValue | null>
  type: 'radioGroup'
  updateModelValue: (value: AcceptableValue) => void
}

export interface DropdownMenuRadio {
  keyboardShortcutKeys?: KeyboardKey[]
  label: string
  render?: () => VNode
  type: 'radio'
  value: AcceptableValue
}

export type DropdownMenuItem = DropdownMenuCheckbox
  | DropdownMenuDivider
  | DropdownMenuGroup
  | DropdownMenuLabel
  | DropdownMenuOption
  | DropdownMenuRadioGroup
  | DropdownMenuRouteOption
  | DropdownMenuSubMenu
