export type SnakeCaseToCamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${Lowercase<T>}${Capitalize<SnakeCaseToCamelCase<U>>}` : Lowercase<S>

export type SnakeCaseToCamelCaseKeys<T> = {
  [K in keyof T as SnakeCaseToCamelCase<K & string>]: T[K]
}

export type CamelCaseToSnakeCase<S extends string> = S extends `${infer T}${infer U}` ? `${Lowercase<T> extends T ? T : `_${Lowercase<T>}`}${CamelCaseToSnakeCase<U>}` : ''

export type CamelCaseToSnakeCaseKeys<T> = {
  [K in keyof T as CamelCaseToSnakeCase<K & string>]: T[K]
}

export class ApiTransformer {
  static toCamelCase<T>(obj: T): SnakeCaseToCamelCaseKeys<T> {
    const newObj = {} as any

    for (const key in obj) {
      const newKey = key.replace(/_./g, (match) => {
        if (match[1] == null) {
          return ''
        }

        return match?.[1]?.toUpperCase()
      })

      newObj[newKey] = obj[key]
    }

    return newObj as SnakeCaseToCamelCaseKeys<T>
  }

  static toSnakeCase<T>(obj: T): CamelCaseToSnakeCaseKeys<T> {
    const newObj = {} as any

    for (const key in obj) {
      const newKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)

      newObj[newKey] = obj[key]
    }

    return newObj as CamelCaseToSnakeCaseKeys<T>
  }
}
