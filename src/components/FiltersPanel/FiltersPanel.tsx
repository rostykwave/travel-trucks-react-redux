import Button from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import styles from '@/components/FiltersPanel/FiltersPanel.module.css'
import {
  CAMPER_FORMS,
  EQUIPMENT_LABELS,
  FORM_LABELS,
} from '@/constants/campers'
import { EQUIPMENT_KEYS } from '@/types/camper'

/**
 * Markup only — wiring to URL state and the store lands in stage 3 (commit 28).
 * Field set follows the assignment (location text, single body type, multiple
 * equipment), not the mockup's Engine/Transmission radios — see ADR-008.
 */
function FiltersPanel() {
  return (
    <form className={styles.panel}>
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
                    value={key}
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
        <Button type="reset" variant="outline" className={styles.clearButton}>
          <Icon name="close" size={24} />
          Clear filters
        </Button>
      </div>
    </form>
  )
}

export default FiltersPanel
