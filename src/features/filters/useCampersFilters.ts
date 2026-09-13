import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  filtersToSearchParams,
  parseFiltersFromSearchParams,
} from '@/features/filters/urlFilters'
import type { CampersFilters } from '@/features/filters/urlFilters'

/** Reads filters from the URL on load, writes them back on change. */
export function useCampersFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(
    () => parseFiltersFromSearchParams(searchParams),
    [searchParams],
  )

  const setFilters = (next: CampersFilters) => {
    setSearchParams(filtersToSearchParams(next))
  }

  return { filters, setFilters }
}
