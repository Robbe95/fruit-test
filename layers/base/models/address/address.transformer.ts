import type { Address } from '@base/models/address/address.model'
import type { AddressDto } from '@base/models/address/addressDto.model'

export class AddressTransformer {
  static toAddress(dto: AddressDto): Address {
    return {
      id: dto.id,
      box: dto.box,
      city: dto.city,
      country: dto.country,
      email: dto.email,
      label: dto.label,
      number: dto.number,
      phone: dto.phone,
      postalCode: dto.postalCode,
      street: dto.street,
      types: dto.types,
    }
  }
}
