import styles from '@/components/Skeleton/Skeleton.module.css'

export interface SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
}

/** Building block for loading placeholders; catalog card skeleton composes this. */
function Skeleton({
  width = '100%',
  height = '1em',
  className,
}: SkeletonProps) {
  const classes = [styles.skeleton, className].filter(Boolean).join(' ')
  return (
    <span className={classes} style={{ width, height }} aria-hidden="true" />
  )
}

export default Skeleton
