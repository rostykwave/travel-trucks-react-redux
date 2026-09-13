import Icon from '@/components/Icon/Icon'
import styles from '@/components/CamperReviews/CamperReviews.module.css'
import type { Review } from '@/types/camper'

export interface CamperReviewsProps {
  reviews: Review[]
}

function StarRow({ rating }: { rating: number }) {
  const filled = Math.round(rating)

  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon
          key={index}
          name="star"
          size={16}
          className={index < filled ? styles.starFilled : styles.starEmpty}
        />
      ))}
    </div>
  )
}

function CamperReviews({ reviews }: CamperReviewsProps) {
  return (
    <section className={styles.section}>
      <h2 className="text-h2">Reviews</h2>
      {reviews.length === 0 ? (
        <p className={`text-body ${styles.empty}`}>No reviews yet.</p>
      ) : (
        <div className={styles.list}>
          {reviews.map((review, index) => (
            <div key={review.reviewer_name + index} className={styles.review}>
              <div className={styles.person}>
                <div className={styles.avatar} aria-hidden="true">
                  <span className={styles.avatarLetter}>
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className={styles.name}>
                  <span className="text-body-medium">
                    {review.reviewer_name}
                  </span>
                  <StarRow rating={review.reviewer_rating} />
                </div>
              </div>
              <p className={`text-body ${styles.comment}`}>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CamperReviews
