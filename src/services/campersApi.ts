import { api } from '@/services/api'
import { ApiError, CamperNotFoundError } from '@/services/errors'
import type { Camper, CampersResponse, EquipmentKey } from '@/types/camper'
import { toApiLocation } from '@/utils/formatLocation'

export interface CampersQuery {
  page?: number
  limit?: number
  location?: string
  form?: string
  transmission?: string
  engine?: string
  /** Expanded into one `<key>=true` param each — MockAPI has no array syntax. */
  equipment?: EquipmentKey[]
}

export interface RequestOptions {
  signal?: AbortSignal
}

type QueryParams = Record<string, string | number>

const EMPTY_RESULT: CampersResponse = { total: 0, items: [] }

function isNotFound(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404
}

function hasFilters(query: CampersQuery): boolean {
  const { page: _page, limit: _limit, ...filters } = query
  return Object.values(filters).some((value) =>
    Array.isArray(value)
      ? value.length > 0
      : value !== undefined && value !== '',
  )
}

/**
 * MockAPI treats every query parameter as a field filter, so an empty string or
 * a `false` equipment flag would narrow the result instead of being ignored.
 * Parameters are therefore listed explicitly and only added when they carry a
 * value. See docs/01-api-contract.md §4.2.
 */
function toParams(query: CampersQuery): QueryParams {
  const params: QueryParams = {}

  const put = (key: string, value: string | number | undefined) => {
    if (value !== undefined && value !== '') params[key] = value
  }

  put(
    'page',
    query.page !== undefined ? Math.max(1, Math.trunc(query.page)) : undefined,
  )
  put(
    'limit',
    query.limit !== undefined
      ? Math.max(1, Math.trunc(query.limit))
      : undefined,
  )
  put('location', query.location ? toApiLocation(query.location) : undefined)
  put('form', query.form)
  put('transmission', query.transmission)
  put('engine', query.engine)

  for (const key of query.equipment ?? []) params[key] = 'true'

  return params
}

/**
 * An empty filter result comes back as 404, while a page past the end comes back
 * as 200 with an empty array. Both are collapsed into one empty result here, so
 * callers only ever deal with a single shape. A 404 with no filters applied is
 * not that case — it means the endpoint itself is unreachable — so it is left
 * to propagate as a genuine error. See docs/01-api-contract.md §4.1.
 */
export async function getCampers(
  query: CampersQuery = {},
  { signal }: RequestOptions = {},
): Promise<CampersResponse> {
  try {
    const { data } = await api.get<CampersResponse>('/campers', {
      params: toParams(query),
      signal,
    })
    return data
  } catch (error) {
    if (isNotFound(error) && hasFilters(query)) return EMPTY_RESULT
    throw error
  }
}

/** Here a 404 is a genuine error: the camper does not exist. */
export async function getCamperById(
  id: string,
  { signal }: RequestOptions = {},
): Promise<Camper> {
  try {
    const { data } = await api.get<Camper>(`/campers/${id}`, { signal })
    return data
  } catch (error) {
    if (isNotFound(error)) throw new CamperNotFoundError(id, error)
    throw error
  }
}
