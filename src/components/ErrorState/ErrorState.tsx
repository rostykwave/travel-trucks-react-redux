import Button from '@/components/Button/Button'
import styles from '@/components/ErrorState/ErrorState.module.css'

export interface ErrorStateProps {
  title?: string
  message?: string
  retryLabel?: string
  onRetry?: () => void
}

/** No Figma frame covers a request failure anywhere in the app — built from
 * existing tokens, reused for the catalog list and the camper details page. */
function ErrorState({
  title = 'Something went wrong',
  message = "We couldn't load the data. Check your connection and try again.",
  retryLabel = 'Try again',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles.state}>
      <h2 className="text-h2">{title}</h2>
      <p className={`text-body-medium ${styles.subtitle}`}>{message}</p>
      <Button type="button" variant="primary" onClick={onRetry}>
        {retryLabel}
      </Button>
    </div>
  )
}

export default ErrorState
