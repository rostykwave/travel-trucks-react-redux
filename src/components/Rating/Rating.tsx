import Icon from '@/components/Icon/Icon'
import styles from '@/components/Rating/Rating.module.css'

export interface RatingProps {
  rating: number
  reviewsCount: number
}

/**
 * Inline single-star summary, e.g. "4.4(2 Reviews)". No space before the
 * parenthesis — matches the Figma frame literally (confirmed by direct
 * pixel comparison against the reference image, not just the raw text layer).
 */
function Rating({ rating, reviewsCount }: RatingProps) {
  const word = reviewsCount === 1 ? 'Review' : 'Reviews'

  return (
    <span className={styles.rating}>
      <Icon name="star" size={16} />
      <span className={`${styles.text} text-body`}>
        {rating}({reviewsCount} {word})
      </span>
    </span>
  )
}

export default Rating
