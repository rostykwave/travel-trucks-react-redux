import Loader from '@/components/Loader/Loader'
import styles from '@/components/CatalogLoadingModal/CatalogLoadingModal.module.css'

/** Matches the real Figma "loading" frame — a centered white card with the
 * spinner, not per-card skeletons (a deliberate change from the plan's own
 * default, at the developer's explicit call). */
function CatalogLoadingModal() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <Loader size={72} />
        <div className={styles.text}>
          <h2 className="text-h2">Loading tracks...</h2>
          <p className="text-body-medium">
            Please wait while we fetch the best travel trucks for you
          </p>
        </div>
      </div>
    </div>
  )
}

export default CatalogLoadingModal
