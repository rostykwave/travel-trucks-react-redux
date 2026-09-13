import Icon from '@/components/Icon/Icon'
import styles from '@/components/Location/Location.module.css'
import { formatLocation } from '@/utils/formatLocation'

export interface LocationProps {
  location: string
}

function Location({ location }: LocationProps) {
  return (
    <span className={styles.location}>
      <Icon name="map-pin" size={16} />
      <span className="text-body">{formatLocation(location)}</span>
    </span>
  )
}

export default Location
