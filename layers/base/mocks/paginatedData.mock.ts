import type {
  PaginatedApiData,
} from '@base/models/paginated-data/paginatedApiData.model'

export function createPaginatedData<T>(data: T[]): PaginatedApiData<T> {
  return {
    data,
    pagination: {
      count: data.length,
      perPage: 20,
      total: data.length,
    },
  } satisfies PaginatedApiData<T>
}
