import type { FetchOptions } from 'ofetch'
import { z } from 'zod'

interface CustomizedError {
  error: z.ZodError
  method: 'delete' | 'get' | 'post' | 'put'
  url: string
}

interface CreateHttpZodClientOptions {
  fetch: typeof $fetch
  onZodError: (error: CustomizedError) => void
}

interface CreateHttpZodClientReturnType {
  delete: <T extends z.ZodType>(options: DeleteOptions<T>) => Promise<z.infer<T>>
  get: <T extends z.ZodType>(options: GetOptions<T>) => Promise<z.infer<T>>
  post: <T extends z.ZodType>(options: PostOptions<T>) => Promise<z.infer<T>>
  put: <T extends z.ZodType>(options: PutOptions<T>) => Promise<z.infer<T>>
}

interface GetOptions<T extends z.ZodType> {
  config?: FetchOptions<any>
  responseSchema: T
  url: string
}

interface PostOptions<T extends z.ZodType> {
  body: any
  config?: FetchOptions<any>
  responseSchema: T
  url: string
}

interface PutOptions<T extends z.ZodType> {
  body: any
  config?: FetchOptions<any>
  responseSchema: T
  url: string
}

interface DeleteOptions<T extends z.ZodType> {
  body?: any
  config?: FetchOptions<any>
  responseSchema?: T
  url: string
}

export function createHttpZodClient(
  { fetch, onZodError }: CreateHttpZodClientOptions,
): CreateHttpZodClientReturnType {
  async function get<T extends z.ZodType>(options: GetOptions<T>): Promise<z.infer<T>> {
    const {
      config,
      responseSchema,
      url,
    } = options

    const data = await fetch<unknown>(url, {
      ...(config ?? {}),
      method: 'get',
    })

    try {
      return responseSchema.parse(data)
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        onZodError({
          error,
          method: 'get',
          url,
        })

        return data
      }

      throw error
    }
  }

  async function post<T extends z.ZodType>(options: PostOptions<T>) {
    const {
      body,
      config,
      responseSchema,
      url,
    } = options

    const data = await fetch(url, {
      ...(config ?? {}),
      body,
      method: 'post',
    })

    try {
      return responseSchema.parse(data)
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        onZodError({
          error,
          method: 'post',
          url,
        })

        return data
      }

      throw error
    }
  }

  async function put<T extends z.ZodType>(options: PutOptions<T>) {
    const {
      body,
      config,
      responseSchema,
      url,
    } = options

    const data = await fetch(url, {
      ...(config ?? {}),
      body,
      method: 'put',
    })

    try {
      return responseSchema.parse(data)
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        onZodError({
          error,
          method: 'put',
          url,
        })

        return data
      }

      throw error
    }
  }

  async function del<T extends z.ZodType>(options: DeleteOptions<T>) {
    const {
      body,
      config,
      responseSchema,
      url,
    } = options

    const data = await fetch(url, {
      ...(config ?? {}),
      body,
      method: 'delete',
    })

    if (responseSchema == null) {
      return
    }

    try {
      return responseSchema.parse(data)
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        onZodError({
          error,
          method: 'delete',
          url,
        })

        return data
      }

      throw error
    }
  }

  return {
    delete: del,
    get,
    post,
    put,
  }
}
