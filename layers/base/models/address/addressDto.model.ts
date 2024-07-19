import { addressTypeSchema } from '@base/models/address/addressType.model'
import { addressUuidSchema } from '@base/models/address/addressUuid.model'
import { z } from 'zod'

export const addressDtoSchema = z.object({
  id: addressUuidSchema,
  box: z.string().nullable(),
  city: z.string(),
  country: z.string(),
  email: z.string().nullable(),
  label: z.string(),
  number: z.number(),
  phone: z.string().nullable(),
  postalCode: z.string(),
  street: z.string(),
  types: addressTypeSchema.array(),
})

export type AddressDto = z.infer<typeof addressDtoSchema>
