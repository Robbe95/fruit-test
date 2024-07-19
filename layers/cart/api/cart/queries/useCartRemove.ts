import { cartKeys } from '@cart/api/cart/keys/cart.keys'
import { CartService } from '@cart/api/cart/services/cart.service'
import type { CartRemoveForm } from '@cart/models/cart/remove/cartRemoveForm.model'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export function useCartRemove() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (form: CartRemoveForm) => {
      return await CartService.remove(form)
    },
    onSuccess(data) {
      queryClient.setQueryData(cartKeys.get.queryKey, data)
    },
  })
};
