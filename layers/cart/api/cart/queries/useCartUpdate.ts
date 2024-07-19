import { cartKeys } from '@cart/api/cart/keys/cart.keys'
import { CartService } from '@cart/api/cart/services/cart.service'
import type { CartUpdateForm } from '@cart/models/cart/update/cartUpdateForm.model'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export function useCartUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (form: CartUpdateForm) => {
      return await CartService.update(form)
    },
    onSuccess(data) {
      queryClient.setQueryData(cartKeys.get.queryKey, data)
    },
  })
};
