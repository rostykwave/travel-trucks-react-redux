import type { CSSProperties } from 'react'

import styles from '@/components/Loader/Loader.module.css'

export interface LoaderProps {
  size?: number
}

/** Generic spinner for single-item loads (camper details, form submit). */
function Loader({ size }: LoaderProps) {
  const style: CSSProperties | undefined = size
    ? ({ '--loader-size': `${size}px` } as CSSProperties)
    : undefined

  return (
    <div
      className={styles.spinner}
      style={style}
      role="status"
      aria-label="Loading"
    />
  )
}

export default Loader
