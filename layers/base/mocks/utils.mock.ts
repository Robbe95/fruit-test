import { generateUuid } from '@base/utils/uuid/generateUuid.util'

export function createString(length: number = 12): string {
  return Math.random().toString(36).substring(2, length + 2)
}

export function createNumber(min: number = 0, max: number = 1000): number {
  // whole number
  if (min % 1 === 0 && max % 1 === 0) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  return Math.random() * (max - min) + min
}

export function createBoolean(): boolean {
  return Math.random() < 0.5
}

export function createUuid(): string {
  return generateUuid()
}

export function createDate(): Date {
  const date = new Date()

  date.setFullYear(date.getFullYear() - Math.floor(Math.random() * 10))

  return date
}

export function createEmail(): string {
  return `${createString(8)}@${createString(8)}.com`
}
