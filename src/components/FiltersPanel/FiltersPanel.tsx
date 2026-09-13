import type { FormEvent } from 'react'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import styles from '@/components/FiltersPanel/FiltersPanel.module.css'
import {
  CAMPER_FORM_FILTER_OPTIONS,
  ENGINE_FILTER_OPTIONS,
  EQUIPMENT_LABELS,
  TRANSMISSION_FILTER_OPTIONS,
} from '@/constants/campers'
import type { FilterOption } from '@/constants/campers'
import type { CampersFilters } from '@/features/filters/urlFilters'
import { useCampersFilters } from '@/features/filters/useCampersFilters'
import { EQUIPMENT_KEYS } from '@/types/camper'
import type { EquipmentKey } from '@/types/camper'

const EQUIPMENT_OPTIONS: FilterOption[] = EQUIPMENT_KEYS.map((key) => ({
  value: key,
  label: EQUIPMENT_LABELS[key],
}))

function isEquipmentKey(value: string): value is EquipmentKey {
  return (EQUIPMENT_KEYS as readonly string[]).includes(value)
}

/**
 * Camper form / Engine / Transmission follow the Figma filters panel (labels and
 * order). Vehicle equipment is a multi-select the mockup has no reference for at
 * all — it exists because the assignment requires filtering by AC, kitchen "and
 * other criteria, several at a time". Its checkboxes reuse the radio styling
 * with a square instead of a circle. See ADR-008.
 *
 * The form is uncontrolled, keyed on the current filters so it remounts (and
 * re-syncs its defaultValue/defaultChecked) whenever the URL changes from
 * outside — e.g. Clear filters, or a filtered link pasted directly.
 */
function FiltersPanel() {
  const { filters, setFilters } = useCampersFilters()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: CampersFilters = {}

    const location = data.get('location')
    if (typeof location === 'string' && location.trim()) {
      next.location = location.trim()
    }

    const form = data.get('form')
    if (typeof form === 'string' && form) next.form = form

    const engine = data.get('engine')
    if (typeof engine === 'string' && engine) next.engine = engine

    const transmission = data.get('transmission')
    if (typeof transmission === 'string' && transmission) {
      next.transmission = transmission
    }

    const equipment = data
      .getAll('equipment')
      .filter((value): value is string => typeof value === 'string')
      .filter(isEquipmentKey)
    if (equipment.length > 0) next.equipment = equipment

    setFilters(next)
  }

  const renderGroup = (
    legend: string,
    name: string,
    type: 'radio' | 'checkbox',
    options: FilterOption[],
    isSelected: (value: string) => boolean,
  ) => (
    <fieldset className={styles.group}>
      <legend className={`text-body ${styles.groupLegend}`}>{legend}</legend>
      <div className={styles.groupOptions}>
        {options.map((option) => (
          <label key={option.value} className={`text-body ${styles.option}`}>
            <input
              type={type}
              name={name}
              value={option.value}
              defaultChecked={isSelected(option.value)}
              className={type === 'radio' ? styles.radio : styles.checkbox}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )

  const selectedEquipment = new Set<string>(filters.equipment ?? [])

  return (
    <form
      key={JSON.stringify(filters)}
      className={styles.panel}
      onSubmit={handleSubmit}
    >
      <div className={styles.info}>
        <div className={styles.field}>
          <label htmlFor="location" className={`text-body ${styles.label}`}>
            Location
          </label>
          <div className={styles.locationInput}>
            <Icon name="map-pin" size={20} />
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Kyiv, Ukraine"
              defaultValue={filters.location ?? ''}
              className={`text-body ${styles.locationField}`}
            />
          </div>
        </div>

        <div className={styles.groups}>
          <h3 className="text-h3">Filters</h3>

          {renderGroup(
            'Vehicle equipment',
            'equipment',
            'checkbox',
            EQUIPMENT_OPTIONS,
            (value) => selectedEquipment.has(value),
          )}
          {renderGroup(
            'Camper form',
            'form',
            'radio',
            CAMPER_FORM_FILTER_OPTIONS,
            (value) => filters.form === value,
          )}
          {renderGroup(
            'Engine',
            'engine',
            'radio',
            ENGINE_FILTER_OPTIONS,
            (value) => filters.engine === value,
          )}
          {renderGroup(
            'Transmission',
            'transmission',
            'radio',
            TRANSMISSION_FILTER_OPTIONS,
            (value) => filters.transmission === value,
          )}
        </div>
      </div>

      <div className={styles.buttons}>
        <Button type="submit" variant="primary">
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          className={styles.clearButton}
          onClick={() => setFilters({})}
        >
          <Icon name="close" size={24} />
          Clear filters
        </Button>
      </div>
    </form>
  )
}

export default FiltersPanel
