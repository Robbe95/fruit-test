import { useGlobalI18n } from '@base/composables/i18n/useGlobaI18n'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'

import { userIdSchema } from './currentUserId.model'

export const currentUserFormSchema = z.object({
  id: userIdSchema,
  email: z.string().email().max(255),
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  phone: z.string().superRefine((value, ctx) => {
    const { t } = useGlobalI18n()

    if (!isValidPhoneNumber(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('validation.invalid_phone'),
      })
    }
  }),
})

export type CurrentUserForm = z.infer<typeof currentUserFormSchema>
