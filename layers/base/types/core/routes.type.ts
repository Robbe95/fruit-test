import type { RouteLocationRaw } from 'vue-router'

export interface Routes {
  test: void
}

export type RouteLocationTyped<T extends keyof Routes> = RouteLocationRaw &
  (Routes[T] extends { params: infer P }
    ? P extends undefined
      ? object
      : {
          params: P
        }
    : object) & {
      name: T
    }
