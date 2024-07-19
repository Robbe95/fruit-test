import { addressSchema } from '@base/models/address/address.model'
import { orderStatusSchema } from '@cart/models/order/orderStatus.model'
import { orderUuidSchema } from '@cart/models/order/orderUuid.model'
import { orderProductSchema } from '@cart/models/order-product/orderProduct.model'
import { z } from 'zod'

export const orderSchema = z.object({
  id: orderUuidSchema,
  deliveryDate: z.date().nullable(),
  orderDate: z.date(),
  isDelivered: z.boolean(),
  deliveryAddress: addressSchema.nullable(),
  invoiceAddress: addressSchema.nullable(),
  orderLineCount: z.number(),
  orderNumber: z.string(),
  orderProducts: z.array(orderProductSchema),
  orderStatus: orderStatusSchema,
  remarks: z.string().nullable(),
})

export type Order = z.infer<typeof orderSchema>
