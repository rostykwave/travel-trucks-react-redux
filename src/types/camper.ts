export type CamperForm = 'alcove' | 'fullyIntegrated' | 'panelTruck'
export type CamperTransmission = 'automatic' | 'manual'
export type CamperEngine = 'diesel' | 'petrol' | 'hybrid'

/** Boolean equipment flags, in the order the assignment lists them. */
export const EQUIPMENT_KEYS = [
  'AC',
  'bathroom',
  'kitchen',
  'TV',
  'radio',
  'refrigerator',
  'microwave',
  'gas',
  'water',
] as const

export type EquipmentKey = (typeof EQUIPMENT_KEYS)[number]

export interface GalleryImage {
  thumb: string
  original: string
}

export interface Review {
  reviewer_name: string
  reviewer_rating: number
  comment: string
}

export type Camper = {
  id: string
  name: string
  price: number
  rating: number
  location: string
  description: string
  form: CamperForm
  /** Dimensions arrive as strings with units, e.g. "7.3m", "208l", "30l/100km". */
  length: string
  width: string
  height: string
  tank: string
  consumption: string
  transmission: CamperTransmission
  engine: CamperEngine
  gallery: GalleryImage[]
  reviews: Review[]
} & Record<EquipmentKey, boolean>

export interface CampersResponse {
  total: number
  items: Camper[]
}
