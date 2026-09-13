import BookingForm from '@/components/BookingForm/BookingForm'
import CamperGallery from '@/components/CamperGallery/CamperGallery'
import CamperReviews from '@/components/CamperReviews/CamperReviews'
import Location from '@/components/Location/Location'
import Rating from '@/components/Rating/Rating'
import VehicleDetailsCard from '@/components/VehicleDetailsCard/VehicleDetailsCard'
import fixture from '@/__fixtures__/camper.json'
import styles from '@/pages/CamperDetailsPage/CamperDetailsPage.module.css'
import { formatPrice } from '@/utils/formatPrice'
import type { Camper } from '@/types/camper'

const camper = fixture as Camper

/**
 * Gallery (commit 18), vehicle details (19), reviews (20) and the booking
 * form (22) are added by later commits — this is the page skeleton and the
 * name/price/rating/location header block only.
 */
function CamperDetailsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <CamperGallery images={camper.gallery} alt={camper.name} />
        <div className={styles.infoContainer}>
          <div className={styles.headerCard}>
            <div className={styles.title}>
              <div className={styles.titleRow}>
                <h1 className={`text-h2 ${styles.name}`}>{camper.name}</h1>
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
          </div>
          <VehicleDetailsCard camper={camper} />
        </div>
      </div>
      <div className={styles.reviewsSection}>
        <h2 className="text-h2">Reviews</h2>
        <div className={styles.reviewsRow}>
          <CamperReviews reviews={camper.reviews} />
          <BookingForm />
        </div>
      </div>
    </div>
  )
}

export default CamperDetailsPage
