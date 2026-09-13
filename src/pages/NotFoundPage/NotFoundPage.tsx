import { Link } from 'react-router-dom'

import buttonStyles from '@/components/Button/Button.module.css'
import styles from '@/pages/NotFoundPage/NotFoundPage.module.css'

/** No Figma frame covers a generic unknown-route 404 — built from existing tokens. */
function NotFoundPage() {
  return (
    <div className={styles.page}>
      <p className={`text-h1 ${styles.code}`}>404</p>
      <p className={`text-body ${styles.message}`}>
        This page doesn&apos;t exist. It might have been moved or removed.
      </p>
      <Link
        to="/catalog"
        className={`${buttonStyles.base} ${buttonStyles.primary}`}
      >
        Back to catalog
      </Link>
    </div>
  )
}

export default NotFoundPage
