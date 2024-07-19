import { createQueryKeys } from '@lukemorales/query-key-factory'

export const cartKeys = createQueryKeys('cart', {
  get: {
    queryKey: null,
  },
})
