import Badge from '@/components/Badge/Badge'
import styles from '@/components/VehicleDetailsCard/VehicleDetailsCard.module.css'
import {
  ENGINE_LABELS,
  EQUIPMENT_LABELS,
  FORM_LABELS,
  TRANSMISSION_LABELS,
} from '@/constants/campers'
import { EQUIPMENT_KEYS } from '@/types/camper'
import type { Camper } from '@/types/camper'

export interface VehicleDetailsCardProps {
  camper: Camper
}

/**
 * Characteristics list is exactly the assignment's set — transmission, engine,
 * then only the equipment flags that are true. Form is shown once, in the
 * details table, even though the mockup's example content repeats it as a
 * badge too — that reads as inconsistent example copy, not a real requirement.
 */
function VehicleDetailsCard({ camper }: VehicleDetailsCardProps) {
  const details: [string, string][] = [
    ['Form', FORM_LABELS[camper.form]],
    ['Length', camper.length],
    ['Width', camper.width],
    ['Height', camper.height],
    ['Tank', camper.tank],
    ['Consumption', camper.consumption],
  ]

  return (
    <div className={styles.card}>
      <div className={styles.features}>
        <h2 className="text-h2">Vehicle details</h2>
        <div className={styles.badges}>
          <Badge label={TRANSMISSION_LABELS[camper.transmission]} />
          <Badge label={ENGINE_LABELS[camper.engine]} />
          {EQUIPMENT_KEYS.filter((key) => camper[key]).map((key) => (
            <Badge key={key} label={EQUIPMENT_LABELS[key]} />
          ))}
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.info}>
        {details.map(([label, value]) => (
          <div key={label} className={`text-body ${styles.infoRow}`}>
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VehicleDetailsCard
