import Icon, { type IconName } from '@/components/Icon/Icon'
import styles from '@/components/Badge/Badge.module.css'

export interface BadgeProps {
  label?: string
  icon?: IconName
}

/** Pill badge from the catalog card (e.g. engine, transmission, form). */
function Badge({ label, icon }: BadgeProps) {
  if (!label) return null

  return (
    <span className={`${styles.badge} text-body-medium`}>
      {icon && <Icon name={icon} size={20} />}
      {label}
    </span>
  )
}

export default Badge
