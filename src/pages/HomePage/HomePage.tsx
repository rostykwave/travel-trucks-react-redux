import { Link } from 'react-router-dom'

import hero from '@/assets/hero.jpg'
import buttonStyles from '@/components/Button/Button.module.css'
import styles from '@/pages/HomePage/HomePage.module.css'

/**
 * The hero photo spans the full viewport width even beyond the 1440 design
 * width (Figma doesn't define behavior past that) — the text stays aligned
 * to the same 1440-centered column as the rest of the page.
 */
function HomePage() {
  return (
    <section className={styles.hero}>
      <img src={hero} alt="" className={styles.image} />
      <div className={styles.overlay} />
      <div className={styles.heroInner}>
        <div className={styles.title}>
          <div className={styles.text}>
            <h1 className="text-h1">Campers of your dreams</h1>
            <p className="text-h2">
              You can find everything you want in our catalog
            </p>
          </div>
          <Link
            to="/catalog"
            className={`${buttonStyles.base} ${buttonStyles.primary} ${buttonStyles.cta}`}
          >
            View Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomePage
