import type { FormEvent } from 'react'

import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import styles from '@/components/FiltersPanel/FiltersPanel.module.css'
import {
  CAMPER_FORMS,
  EQUIPMENT_LABELS,
  FORM_LABELS,
} from '@/constants/campers'
import { isCamperForm } from '@/features/filters/urlFilters'
import type { CampersFilters } from '@/features/filters/urlFilters'
import { useCampersFilters } from '@/features/filters/useCampersFilters'
import { EQUIPMENT_KEYS } from '@/types/camper'

/**
 * Field set follows the assignment (location text, single body type, multiple
 * equipment), not the mockup's Engine/Transmission radios — see ADR-008.
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
    if (typeof form === 'string' && isCamperForm(form)) next.form = form

    for (const key of EQUIPMENT_KEYS) {
      if (data.get(key) === 'on') next[key] = true
    }

    setFilters(next)
  }

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
              className="text-body"
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div className={styles.groups}>
          <h3 className="text-h3">Filters</h3>

          <fieldset className={styles.group}>
            <legend className={`text-body ${styles.groupLegend}`}>
              Vehicle type
            </legend>
            <div className={styles.groupOptions}>
              {CAMPER_FORMS.map((form) => (
                <label key={form} className={`text-body ${styles.option}`}>
                  <input
                    type="radio"
                    name="form"
                    value={form}
                    defaultChecked={filters.form === form}
                    className={styles.radio}
                  />
                  {FORM_LABELS[form]}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.group}>
            <legend className={`text-body ${styles.groupLegend}`}>
              Equipment
            </legend>
            <div className={styles.groupOptions}>
              {EQUIPMENT_KEYS.map((key) => (
                <label key={key} className={`text-body ${styles.option}`}>
                  <input
                    type="checkbox"
                    name={key}
                    defaultChecked={Boolean(filters[key])}
                    className={styles.checkbox}
                  />
                  {EQUIPMENT_LABELS[key]}
                </label>
              ))}
            </div>
          </fieldset>
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
