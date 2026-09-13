import Icon from '@/components/Icon/Icon'
import styles from '@/components/Rating/Rating.module.css'

export interface RatingProps {
  rating: number
  reviewsCount: number
}

/** Inline single-star summary used on the catalog card, e.g. "4.4 (2 Reviews)". */
function Rating({ rating, reviewsCount }: RatingProps) {
  const word = reviewsCount === 1 ? 'Review' : 'Reviews'

  return (
    <span className={styles.rating}>
      <Icon name="star" size={16} />
      <span className={`${styles.text} text-body`}>
        {rating} ({reviewsCount} {word})
      </span>
    </span>
  )
}

export default Rating
