import Button from '@/components/Button/Button'
import styles from '@/components/CatalogErrorState/CatalogErrorState.module.css'

export interface CatalogErrorStateProps {
  onRetry?: () => void
}

/** No Figma frame covers a catalog request failure — built from existing tokens,
 * mirroring CatalogEmptyState's shape (see also NotFoundPage). */
function CatalogErrorState({ onRetry }: CatalogErrorStateProps) {
  return (
    <div className={styles.state}>
      <h2 className="text-h2">Something went wrong</h2>
      <p className={`text-body-medium ${styles.subtitle}`}>
        We couldn&apos;t load the campers. Check your connection and try again.
      </p>
      <Button type="button" variant="primary" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

export default CatalogErrorState
