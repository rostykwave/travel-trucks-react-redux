import { CAMPER_FORMS } from '@/constants/campers'
import { EQUIPMENT_KEYS } from '@/types/camper'
import type { CamperForm, EquipmentKey } from '@/types/camper'

export interface CampersFilters extends Partial<Record<EquipmentKey, boolean>> {
  location?: string
  form?: CamperForm
}

export const isCamperForm = (value: string): value is CamperForm =>
  (CAMPER_FORMS as string[]).includes(value)

/**
 * URL searchParams is the source of truth for filters (ADR-004) — there is no
 * Redux slice for the filter values themselves, only these pure functions and
 * the useCampersFilters hook that wraps react-router's useSearchParams.
 */
export function parseFiltersFromSearchParams(
  params: URLSearchParams,
): CampersFilters {
  const filters: CampersFilters = {}

  const location = params.get('location')
  if (location) filters.location = location

  const form = params.get('form')
  if (form && isCamperForm(form)) filters.form = form

  for (const key of EQUIPMENT_KEYS) {
    if (params.get(key) === 'true') filters[key] = true
  }

  return filters
}

export function filtersToSearchParams(
  filters: CampersFilters,
): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.location) params.set('location', filters.location)
  if (filters.form) params.set('form', filters.form)

  for (const key of EQUIPMENT_KEYS) {
    if (filters[key]) params.set(key, 'true')
  }

  return params
}
