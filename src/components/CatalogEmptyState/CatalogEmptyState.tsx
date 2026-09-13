import { Link } from 'react-router-dom'

import Button from '@/components/Button/Button'
import buttonStyles from '@/components/Button/Button.module.css'
import Icon from '@/components/Icon/Icon'
import styles from '@/components/CatalogEmptyState/CatalogEmptyState.module.css'

export interface CatalogEmptyStateProps {
  onClearFilters?: () => void
}

/** Shown when the current filters match nothing (a 404 per docs/01-api-contract.md §4.1).
 * The mockup's decorative illustration is skipped — heading and actions carry the meaning. */
function CatalogEmptyState({ onClearFilters }: CatalogEmptyStateProps) {
  return (
    <div className={styles.state}>
      <h2 className="text-h2">No campers found</h2>
      <p className={`text-body-medium ${styles.subtitle}`}>
        We couldn&apos;t find any campers that match your filters. Try adjusting
        your search or clearing some filters.
      </p>
      <div className={styles.buttons}>
        <Button
          type="button"
          variant="outline"
          className={styles.clearButton}
          onClick={onClearFilters}
        >
          <Icon name="close" size={24} />
          Clear filters
        </Button>
        <Link
          to="/catalog"
          className={`${buttonStyles.base} ${buttonStyles.primary}`}
        >
          View all campers
        </Link>
      </div>
    </div>
  )
}

export default CatalogEmptyState
