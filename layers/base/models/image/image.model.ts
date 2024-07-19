import { z } from 'zod'

export const imageVariantTypeEnum = z.enum([
  'jpg',
  'webp',
])
export const imageVariantSizeEnum = z.enum([
  '2xl',
  'lg',
  'md',
  'sm',
  'thumb',
  'xl',
  'xs',
])

export const imageVariantSizeSchema = z.record(imageVariantSizeEnum, z.string())
export const imageVariantSchema = z.record(imageVariantTypeEnum, imageVariantSizeSchema)
export const imageSchema = z.object({
  uuid: z.string(),
  createdAt: z.number(),
  name: z.string(),
  collectionName: z.string(),
  customProperties: z.array(z.string()),
  file: z.string(),
  size: z.number(),
  type: z.string(),
  variants: imageVariantSchema,
})

export type Image = z.infer<typeof imageSchema>
export type ImageVariantTypeEnum = z.infer<typeof imageVariantTypeEnum>
export type ImageVariantSizeEnum = z.infer<typeof imageVariantSizeEnum>
export type ImageVariant = z.infer<typeof imageVariantSchema>
export type ImageVariantSize = z.infer<typeof imageVariantSizeSchema>
