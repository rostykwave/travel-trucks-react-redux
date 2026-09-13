import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import styles from '@/components/Layout/Layout.module.css'
import Header from '@/components/Header/Header'

function Layout() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Layout
