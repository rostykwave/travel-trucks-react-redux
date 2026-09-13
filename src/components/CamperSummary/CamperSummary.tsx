import type { ElementType, ReactNode } from 'react'

import Location from '@/components/Location/Location'
import Rating from '@/components/Rating/Rating'
import styles from '@/components/CamperSummary/CamperSummary.module.css'
import { formatPrice } from '@/utils/formatPrice'
import type { Camper } from '@/types/camper'

export interface CamperSummaryProps {
  camper: Camper
  /** h1 on the details page (page heading), h2 in a catalog card (list item). */
  titleAs?: ElementType
  /** The catalog card truncates a long name with ellipsis; the details page shows it in full. */
  truncateName?: boolean
  /**
   * The catalog card puts price beside the name; the details page frame shows
   * price as its own line below rating+location — confirmed by comparing a
   * rendered screenshot against the actual Figma frame image, not just the
   * raw node JSON (which reads ambiguously here).
   */
  stackedPrice?: boolean
  /**
   * Rendered beside the price — the mockup's `price` frame is a 156px row with a
   * 12px gap holding a single label, i.e. it already reserves room for a second
   * control. The catalog card puts the favorite toggle there.
   */
  action?: ReactNode
}

function CamperSummary({
  camper,
  titleAs: Title = 'h2',
  truncateName = false,
  stackedPrice = false,
  action,
}: CamperSummaryProps) {
  const name = (
    <Title
      className={`text-h2 ${styles.name} ${truncateName ? styles.nameTruncate : ''}`}
    >
      {camper.name}
    </Title>
  )
  const price = (
    <div className={styles.priceRow}>
      <p className={`text-h2 ${styles.price}`}>{formatPrice(camper.price)}</p>
      {action}
    </div>
  )
  const details = (
    <div className={styles.details}>
      <Rating rating={camper.rating} reviewsCount={camper.reviews.length} />
      <Location location={camper.location} />
    </div>
  )

  if (stackedPrice) {
    return (
      <div className={styles.summary}>
        {name}
        {details}
        {price}
      </div>
    )
  }

  return (
    <div className={styles.summary}>
      <div className={styles.titleRow}>
        {name}
        {price}
      </div>
      {details}
    </div>
  )
}

export default CamperSummary
