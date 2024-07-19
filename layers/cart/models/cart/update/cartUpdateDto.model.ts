import { z } from 'zod'

export const cartUpdateDtoSchema = z.object({
  quantity: z.number().min(1),
})

export type CartUpdateDto = z.infer<typeof cartUpdateDtoSchema>
