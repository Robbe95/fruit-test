import type { Icon } from '@base/icons/icons'
import type {
  ComputedRef,
  MaybeRef,
  Ref,
} from 'vue'

export type ToastType = 'error' | 'info' | 'success'

export interface ToastAction {
  isLoading?: ComputedRef<boolean> | Ref<boolean>
  label: MaybeRef<string>
  onClick: (onClose: () => void) => void
}

export interface Toast {
  title: string
  action?: ToastAction
  description?: string
  duration?: number
  icon: Icon
  type: ToastType
}
