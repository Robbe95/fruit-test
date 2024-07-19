import { z } from 'zod'

export const orderProductUuidSchema = z.string().uuid().brand('OrderProductUuid')
export type OrderProductUuid = z.infer<typeof orderProductUuidSchema>
