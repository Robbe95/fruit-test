import { z } from 'zod'

export const orderUuidSchema = z.string().uuid().brand('OrderUuid')
export type OrderUuid = z.infer<typeof orderUuidSchema>
