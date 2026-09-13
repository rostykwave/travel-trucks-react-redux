import { NavLink } from 'react-router-dom'

import logo from '@/assets/logo.svg'
import styles from '@/components/Header/Header.module.css'

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? `${styles.link} text-body-medium ${styles.linkActive}`
    : `${styles.link} text-body-medium`

function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/" aria-label="TravelTrucks home">
        <img src={logo} alt="TravelTrucks" className={styles.logo} />
      </NavLink>
      <nav className={styles.nav}>
        <NavLink to="/" end className={navLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={navLinkClassName}>
          Catalog
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
