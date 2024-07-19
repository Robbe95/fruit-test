import { addressDtoSchema } from '@base/models/address/addressDto.model'
import { orderStatusSchema } from '@cart/models/order/orderStatus.model'
import { orderUuidSchema } from '@cart/models/order/orderUuid.model'
import { orderProductDtoSchema } from '@cart/models/order-product/orderProductDto.model'
import { z } from 'zod'

export const orderDtoSchema = z.object({
  id: orderUuidSchema,
  deliveryDate: z.string().nullable(),
  orderDate: z.string(),
  isDelivered: z.boolean(),
  deliveryAddress: addressDtoSchema.nullable(),
  invoiceAddress: addressDtoSchema.nullable(),
  orderLineCount: z.number(),
  orderNumber: z.string(),
  orderProducts: z.array(orderProductDtoSchema),
  orderStatus: orderStatusSchema,
  remarks: z.string().nullable(),
})

export type OrderDto = z.infer<typeof orderDtoSchema>
