import Skeleton from '@/components/Skeleton/Skeleton'
import styles from '@/components/CamperCardSkeleton/CamperCardSkeleton.module.css'

/** Placeholder shaped like CamperCard, shown while the catalog request is in flight. */
function CamperCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <Skeleton
        className={styles.picture}
        width="var(--layout-card-image-width)"
        height="var(--layout-card-image-height)"
      />
      <div className={styles.info}>
        <div className={styles.title}>
          <Skeleton width="60%" height="32px" />
          <Skeleton width="90px" height="32px" />
        </div>
        <div className={styles.details}>
          <Skeleton width="100px" height="24px" />
          <Skeleton width="120px" height="24px" />
        </div>
        <div className={styles.description}>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton width="70%" height="20px" />
        </div>
        <div className={styles.badges}>
          <Skeleton className={styles.badge} width="90px" height="44px" />
          <Skeleton className={styles.badge} width="110px" height="44px" />
          <Skeleton className={styles.badge} width="90px" height="44px" />
        </div>
        <Skeleton className={styles.button} width="173px" height="56px" />
      </div>
    </div>
  )
}

export default CamperCardSkeleton
