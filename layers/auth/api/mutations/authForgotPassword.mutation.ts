import { AuthService } from '@auth/api/services/auth.service'
import type { ForgotPasswordForm } from '@auth/models/forgot-password/forgotPasswordForm.model'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export function useAuthForgotPasswordMutation() {
  return useMutation({
    mutationFn: async (input: ForgotPasswordForm) => {
      await AuthService.forgotPassword(input)
    },
    onSuccess: () => {
      const queryClient = useQueryClient()

      void queryClient.invalidateQueries({
        queryKey: [
          'current-user',
        ],
      })
    },
  })
}
