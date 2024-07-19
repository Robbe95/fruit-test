import {
  createEmail,
  createString,
} from '@base/mocks/utils.mock'
import type { Address } from '@base/models/address/address.model'
import { generateUuid } from '@base/utils/uuid/generateUuid.util'

export function createAddress(overrides: Partial<Address> = {}): Address {
  return {
    id: generateUuid(),
    box: createString(12),
    city: createString(12),
    country: createString(12),
    email: createEmail(),
    label: createString(12),
    number: createString(12),
    postalCode: createString(12),
    street: createString(12),
    types: [
      'delivery',
      'invoice',
    ].splice(Math.floor(Math.random() * 2), 1),
    ...overrides,
  } as Address
}

export function createAddresses(count: number): Address[] {
  return Array.from({ length: count }, () => createAddress())
}
