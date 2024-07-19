import type { Image, ImageVariant } from '@base/models/image/image.model'
import type {
  ImageDto,
  ImageVariantDto,
} from '@base/models/image/imageDto.model'
import { ApiTransformer } from '@base/utils/api/apiTransformer'

class ImageTransformer {
  static toImage(imageDto: ImageDto): Image {
    return {
      ...ApiTransformer.toCamelCase(imageDto),
      variants: ImageTransformer.toVariant(imageDto.variants),
    }
  }

  static toVariant(imageVariantDto: ImageVariantDto): ImageVariant {
    return {
      ...imageVariantDto,
      jpg: {
        '2xl': 'https://via.placeholder.com/320x1200',
        'lg': 'https://via.placeholder.com/1024x1024',
        'md': 'https://via.placeholder.com/768x768',
        'sm': 'https://via.placeholder.com/640x640',
        'thumb': 'https://via.placeholder.com/320x320',
        'xl': 'https://via.placeholder.com/1280x1280',
        'xs': 'https://via.placeholder.com/1536x1536',
      },
      // TODO: REMOVE THIS
      webp: {
        '2xl': 'https://via.placeholder.com/320x1200',
        'lg': 'https://via.placeholder.com/1024x1024',
        'md': 'https://via.placeholder.com/768x768',
        'sm': 'https://via.placeholder.com/640x640',
        'thumb': 'https://via.placeholder.com/320x320',
        'xl': 'https://via.placeholder.com/1280x1280',
        'xs': 'https://via.placeholder.com/1536x1536',
      },
    }
  }
}

export default ImageTransformer
