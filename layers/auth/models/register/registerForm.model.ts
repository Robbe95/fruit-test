import { useGlobalI18n } from '@base/composables/i18n/useGlobaI18n'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'

export const registerFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().superRefine((value, ctx) => {
    const { t } = useGlobalI18n()

    if (!isValidPhoneNumber(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('errors.invalid_phone'),
      })
    }
  }),
})

export type RegisterForm = z.infer<typeof registerFormSchema>
