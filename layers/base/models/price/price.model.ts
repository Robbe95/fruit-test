import { z } from 'zod'

export const priceSchema = z.number().brand('Price')
export type Price = z.infer<typeof priceSchema>
