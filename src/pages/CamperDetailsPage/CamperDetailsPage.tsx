import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import BookingForm from '@/components/BookingForm/BookingForm'
import CamperGallery from '@/components/CamperGallery/CamperGallery'
import CamperReviews from '@/components/CamperReviews/CamperReviews'
import ErrorState from '@/components/ErrorState/ErrorState'
import Loader from '@/components/Loader/Loader'
import Location from '@/components/Location/Location'
import Rating from '@/components/Rating/Rating'
import VehicleDetailsCard from '@/components/VehicleDetailsCard/VehicleDetailsCard'
import { fetchCamperById } from '@/features/campers/campersSlice'
import {
  selectCamperDetail,
  selectCamperDetailError,
  selectCamperDetailStatus,
} from '@/features/campers/selectors'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import styles from '@/pages/CamperDetailsPage/CamperDetailsPage.module.css'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { formatPrice } from '@/utils/formatPrice'

function CamperDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const camper = useAppSelector(selectCamperDetail)
  const status = useAppSelector(selectCamperDetailStatus)
  const error = useAppSelector(selectCamperDetailError)

  useEffect(() => {
    if (!id) return
    const promise = dispatch(fetchCamperById(id))
    return () => promise.abort()
  }, [dispatch, id])

  if (status === 'loading' || status === 'idle') {
    return (
      <div className={styles.loaderContainer}>
        <Loader size={48} />
      </div>
    )
  }

  if (error?.notFound) return <NotFoundPage />

  if (status === 'failed' || !camper) {
    return (
      <ErrorState
        title="Couldn't load this camper"
        message={error?.message ?? 'Something went wrong. Please try again.'}
        onRetry={() => {
          if (id) void dispatch(fetchCamperById(id))
        }}
      />
    )
  }

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
