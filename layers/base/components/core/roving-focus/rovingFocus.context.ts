import type { Direction, Orientation } from '@base/components/core/roving-focus/rovingFocus.util'
import { createContext } from 'radix-vue'
import type { Ref } from 'vue'

interface RovingContext {
  currentTabStopId: Ref<null | string | undefined>
  dir: Ref<Direction>
  loop: Ref<boolean>
  orientation: Ref<Orientation | undefined>
  onFocusableItemAdd: () => void
  onFocusableItemRemove: () => void
  onItemFocus: (tabStopId: string) => void
  onItemShiftTab: () => void
}

export const [
  injectRovingFocusGroupContext,
  provideRovingFocusGroupContext,
] = createContext<RovingContext>('RovingFocusGroup')
