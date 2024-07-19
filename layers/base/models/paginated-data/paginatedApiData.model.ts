import { z } from 'zod'

export function paginatedApiDataSchema<T extends z.ZodType>(
  schema: T,
) {
  return z.object({
    data: schema.array(),
    pagination: z.object({
      count: z.number(),
      per_page: z.number(),
      total: z.number(),
    }),
  })
}

export interface PaginatedApiData<TSchema> {
  data: TSchema[]
  pagination: {
    count: number
    perPage: number
    total: number
  }
}
