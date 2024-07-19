import {
  imageVariantSizeEnum,
  imageVariantTypeEnum,
} from '@base/models/image/image.model'
import { z } from 'zod'

export const imageVariantSizeDtoSchema = z.record(imageVariantSizeEnum, z.string().nullable())
export const imageVariantDtoSchema = z.record(imageVariantTypeEnum, imageVariantSizeDtoSchema)
export const imageDtoSchema = z.object({
  uuid: z.string(),
  created_at: z.number(),
  name: z.string(),
  collection_name: z.string(),
  custom_properties: z.array(z.string()),
  file: z.string(),
  size: z.number(),
  type: z.string(),
  variants: imageVariantDtoSchema,
})

export type ImageDto = z.infer<typeof imageDtoSchema>
export type ImageVariantSizeDto = z.infer<typeof imageVariantSizeDtoSchema>
export type ImageVariantDto = z.infer<typeof imageVariantDtoSchema>
export type ImageVariantSize = z.infer<typeof imageVariantSizeEnum>
