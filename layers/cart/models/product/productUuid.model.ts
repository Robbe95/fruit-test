import { z } from 'zod'

export const productUuidSchema = z.string().uuid().brand('ProductUuid')
export type ProductUuid = z.infer<typeof productUuidSchema>
