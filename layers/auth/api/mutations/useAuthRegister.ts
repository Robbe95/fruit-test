import { AuthService } from '@auth/api/services/auth.service'
import type { RegisterForm } from '@auth/models/register/registerForm.model'
import { useMutation } from '@tanstack/vue-query'

export function useAuthRegister() {
  return useMutation({
    mutationFn: async (input: RegisterForm) => {
      await AuthService.register(input)
    },
  })
}
