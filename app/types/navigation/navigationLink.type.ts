import type { TypedRouteLocationRaw } from '@typed-router'

export interface NavigationLink {
  title: string
  isTargetBlank?: boolean
  to: TypedRouteLocationRaw
}
