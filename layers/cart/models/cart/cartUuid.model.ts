import { z } from 'zod'

export const cartUuidSchema = z.string().uuid().brand('CartUuid')
export type CartUuid = z.infer<typeof cartUuidSchema>
