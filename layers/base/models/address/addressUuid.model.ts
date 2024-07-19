import { z } from 'zod'

export const addressUuidSchema = z.string().uuid().brand('AddressUuid')
export type AddressUuid = z.infer<typeof addressUuidSchema>
