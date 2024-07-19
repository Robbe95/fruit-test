import { AuthService } from '@auth/api/services/auth.service'
import type { ResetPasswordForm } from '@auth/models/reset-password/resetPasswordForm.model'
import { useMutation } from '@tanstack/vue-query'

export function useAuthResetPasswordMutation() {
  return useMutation({
    mutationFn: async (input: ResetPasswordForm) => {
      await AuthService.resetPassword(input)
    },
  })
}
