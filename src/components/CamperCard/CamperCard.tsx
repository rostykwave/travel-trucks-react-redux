import { Link } from 'react-router-dom'

import buttonStyles from '@/components/Button/Button.module.css'
import styles from '@/components/CamperCard/CamperCard.module.css'
import Badge from '@/components/Badge/Badge'
import Location from '@/components/Location/Location'
import Rating from '@/components/Rating/Rating'
import {
  ENGINE_LABELS,
  FORM_LABELS,
  TRANSMISSION_LABELS,
} from '@/constants/campers'
import { formatPrice } from '@/utils/formatPrice'
import type { Camper } from '@/types/camper'

export interface CamperCardProps {
  camper: Camper
}

/** The mockup shows exactly three badges (engine, transmission, form) — the
 * nine boolean equipment fields belong to the details page instead. */
function CamperCard({ camper }: CamperCardProps) {
  return (
    <article className={styles.card}>
      <img
        src={camper.gallery[0]?.thumb}
        alt={camper.name}
        className={styles.picture}
      />
      <div className={styles.info}>
        <div className={styles.textContainer}>
          <div className={styles.title}>
            <h2 className={`text-h2 ${styles.name}`}>{camper.name}</h2>
            <p className={`text-h2 ${styles.price}`}>
              {formatPrice(camper.price)}
            </p>
          </div>
          <div className={styles.details}>
            <Rating
              rating={camper.rating}
              reviewsCount={camper.reviews.length}
            />
            <Location location={camper.location} />
          </div>
        </div>
        <p className={`text-body ${styles.description}`}>
          {camper.description}
        </p>
        <div className={styles.badges}>
          <Badge icon="fuel-petrol" label={ENGINE_LABELS[camper.engine]} />
          <Badge
            icon="transmission-automatic"
            label={TRANSMISSION_LABELS[camper.transmission]}
          />
          <Badge icon="form-alcove" label={FORM_LABELS[camper.form]} />
        </div>
        <Link
          to={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonStyles.base} ${buttonStyles.primary}`}
        >
          Show more
        </Link>
      </div>
    </article>
  )
}

export default CamperCard
