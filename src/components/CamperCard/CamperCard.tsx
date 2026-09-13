import { Link } from 'react-router-dom'

import Badge from '@/components/Badge/Badge'
import buttonStyles from '@/components/Button/Button.module.css'
import styles from '@/components/CamperCard/CamperCard.module.css'
import CamperSummary from '@/components/CamperSummary/CamperSummary'
import Icon from '@/components/Icon/Icon'
import {
  ENGINE_LABELS,
  FORM_LABELS,
  TRANSMISSION_LABELS,
} from '@/constants/campers'
import { toggleFavorite } from '@/features/favorites/favoritesSlice'
import { selectIsFavorite } from '@/features/favorites/selectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { Camper } from '@/types/camper'

export interface CamperCardProps {
  camper: Camper
}

/** The mockup shows exactly three badges (engine, transmission, form) — the
 * nine boolean equipment fields belong to the details page instead. */
function CamperCard({ camper }: CamperCardProps) {
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector(selectIsFavorite(camper.id))

  return (
    <article className={styles.card}>
      <img
        src={camper.gallery[0]?.thumb}
        alt={camper.name}
        className={styles.picture}
      />
      <div className={styles.info}>
        <CamperSummary
          camper={camper}
          truncateName
          action={
            <button
              type="button"
              onClick={() => dispatch(toggleFavorite(camper.id))}
              // The label carries the state, so screen readers don't depend on
              // the icon swap alone.
              aria-label={
                isFavorite
                  ? `Remove ${camper.name} from favorites`
                  : `Add ${camper.name} to favorites`
              }
              aria-pressed={isFavorite}
              className={`${styles.favorite} ${
                isFavorite ? styles.favoriteActive : ''
              }`}
            >
              <Icon name={isFavorite ? 'heart-filled' : 'heart'} size={24} />
            </button>
          }
        />
        <p className={`text-body ${styles.description}`}>
          {camper.description}
        </p>
        <div className={styles.badges}>
          <Badge icon="engine" label={ENGINE_LABELS[camper.engine]} />
          <Badge
            icon="transmission"
            label={TRANSMISSION_LABELS[camper.transmission]}
          />
          <Badge icon="form" label={FORM_LABELS[camper.form]} />
        </div>
        <Link
          to={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonStyles.base} ${buttonStyles.primary} ${buttonStyles.cta}`}
        >
          Show more
        </Link>
      </div>
    </article>
  )
}

export default CamperCard
