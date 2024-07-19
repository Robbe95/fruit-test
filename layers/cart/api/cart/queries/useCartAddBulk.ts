import { cartKeys } from '@cart/api/cart/keys/cart.keys'
import { CartService } from '@cart/api/cart/services/cart.service'
import type { CartAddBulkForm } from '@cart/models/cart/add-bulk/cartAddBulkForm.model'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export function useCartAddBulk() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (form: CartAddBulkForm) => {
      return await CartService.addBulk(form)
    },
    onSuccess(data) {
      queryClient.setQueryData(cartKeys.get.queryKey, data)
    },
  })
};
