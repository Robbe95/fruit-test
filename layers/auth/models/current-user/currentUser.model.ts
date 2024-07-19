import { z } from 'zod'

import { userIdSchema } from './currentUserId.model'

export const currentUserSchema = z.object({
  id: userIdSchema,
  email: z.string().email(),
  firstName: z.string(),
  fullName: z.string(),
  lastName: z.string(),
  phone: z.string().nullable(),
})

export type CurrentUser = z.infer<typeof currentUserSchema>
