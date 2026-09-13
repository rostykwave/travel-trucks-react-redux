import type {
  CamperEngine,
  CamperForm,
  CamperTransmission,
  EquipmentKey,
} from '@/types/camper'

/**
 * Cards per request. The catalog column in the mockup is 1344px tall and holds
 * four 312px cards with 32px gaps.
 */
export const CAMPERS_PER_PAGE = 4

/** The mockup names vehicle types differently from the API — see docs/01-api-contract.md A3. */
export const FORM_LABELS: Record<CamperForm, string> = {
  panelTruck: 'Van',
  fullyIntegrated: 'Fully Integrated',
  alcove: 'Alcove',
}

/** Badge order on the camper card. */
export const CAMPER_FORMS: CamperForm[] = [
  'panelTruck',
  'fullyIntegrated',
  'alcove',
]

/** The API sends lowercase values; the mockup displays them capitalized. */
export const ENGINE_LABELS: Record<CamperEngine, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  hybrid: 'Hybrid',
}

export const TRANSMISSION_LABELS: Record<CamperTransmission, string> = {
  automatic: 'Automatic',
  manual: 'Manual',
}

/** Display labels for the equipment filter checkboxes and detail badges. */
export const EQUIPMENT_LABELS: Record<EquipmentKey, string> = {
  AC: 'AC',
  bathroom: 'Bathroom',
  kitchen: 'Kitchen',
  TV: 'TV',
  radio: 'Radio',
  refrigerator: 'Refrigerator',
  microwave: 'Microwave',
  gas: 'Gas',
  water: 'Water',
}

export interface FilterOption {
  value: string
  label: string
}

/**
 * Filters panel option lists — labels and order from the Figma filters panel
 * (Catalog frame), minus its "Semi Integrated" and "Electric" entries: neither
 * exists in the live API, so they could only ever render an empty catalog.
 * See the revised ADR-008.
 */
export const CAMPER_FORM_FILTER_OPTIONS: FilterOption[] = [
  { value: 'alcove', label: 'Alcove' },
  { value: 'panelTruck', label: 'Panel Van' },
  { value: 'fullyIntegrated', label: 'Integrated' },
]

export const ENGINE_FILTER_OPTIONS: FilterOption[] = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'hybrid', label: 'Hybrid' },
]

export const TRANSMISSION_FILTER_OPTIONS: FilterOption[] = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' },
]
