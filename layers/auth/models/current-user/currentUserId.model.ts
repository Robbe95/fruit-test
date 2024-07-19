import { z } from 'zod'

export const userIdSchema = z.string().uuid().brand('UserId')
export type UserId = z.infer<typeof userIdSchema>
