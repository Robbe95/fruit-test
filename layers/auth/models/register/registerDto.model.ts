import { z } from 'zod'

export const registerDtoSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().length(10),
})

export type RegisterDto = z.infer<typeof registerDtoSchema>
