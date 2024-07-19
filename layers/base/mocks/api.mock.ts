export function createApiMock<T>(data: T): Promise<T> {
  return Promise.resolve(data)
}
