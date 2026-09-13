import {
  CAMPER_FORM_FILTER_OPTIONS,
  ENGINE_FILTER_OPTIONS,
  TRANSMISSION_FILTER_OPTIONS,
} from '@/constants/campers'
import { EQUIPMENT_KEYS } from '@/types/camper'
import type { EquipmentKey } from '@/types/camper'

export interface CampersFilters {
  location?: string
  form?: string
  engine?: string
  transmission?: string
  /** Multi-select, per the assignment: AC, kitchen and the rest of the flags. */
  equipment?: EquipmentKey[]
}

const FORM_VALUES = new Set(CAMPER_FORM_FILTER_OPTIONS.map((o) => o.value))
const ENGINE_VALUES = new Set(ENGINE_FILTER_OPTIONS.map((o) => o.value))
const TRANSMISSION_VALUES = new Set(
  TRANSMISSION_FILTER_OPTIONS.map((o) => o.value),
)

/**
 * URL searchParams is where filters enter and leave the app (ADR-004): shareable
 * links, working back/forward, and a filtered catalog survives a reload. The
 * parsed result is then pushed into the filters slice, which is what the rest of
 * the app reads (ADR-011).
 *
 * Equipment is serialised as repeated `equipment` params rather than one comma
 * list, so the URL stays self-describing and needs no custom splitting.
 */
export function parseFiltersFromSearchParams(
  params: URLSearchParams,
): CampersFilters {
  const filters: CampersFilters = {}

  const location = params.get('location')
  if (location) filters.location = location

  const form = params.get('form')
  if (form && FORM_VALUES.has(form)) filters.form = form

  const engine = params.get('engine')
  if (engine && ENGINE_VALUES.has(engine)) filters.engine = engine

  const transmission = params.get('transmission')
  if (transmission && TRANSMISSION_VALUES.has(transmission)) {
    filters.transmission = transmission
  }

  // Iterating the canonical key list (instead of the raw params) both validates
  // the values and gives a stable order, so an unchanged URL always produces an
  // identical object — the catalog effect depends on that.
  const selected = new Set(params.getAll('equipment'))
  const equipment = EQUIPMENT_KEYS.filter((key) => selected.has(key))
  if (equipment.length > 0) filters.equipment = [...equipment]

  return filters
}

export function filtersToSearchParams(
  filters: CampersFilters,
): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.location) params.set('location', filters.location)
  if (filters.form) params.set('form', filters.form)
  if (filters.engine) params.set('engine', filters.engine)
  if (filters.transmission) params.set('transmission', filters.transmission)
  for (const key of filters.equipment ?? []) params.append('equipment', key)

  return params
}
