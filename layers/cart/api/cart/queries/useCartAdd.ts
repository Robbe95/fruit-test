import { cartKeys } from '@cart/api/cart/keys/cart.keys'
import { CartService } from '@cart/api/cart/services/cart.service'
import type { CartAddForm } from '@cart/models/cart/add/cartAddForm.model'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export function useCartAdd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (form: CartAddForm) => {
      return await CartService.add(form)
    },
    onSuccess(data) {
      queryClient.setQueryData(cartKeys.get.queryKey, data)
    },
  })
};
