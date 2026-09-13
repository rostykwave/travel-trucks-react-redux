import styles from '@/components/Loader/Loader.module.css'

/** Generic spinner for single-item loads (camper details, form submit). */
function Loader() {
  return <div className={styles.spinner} role="status" aria-label="Loading" />
}

export default Loader
