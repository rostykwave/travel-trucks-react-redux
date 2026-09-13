import type { ButtonHTMLAttributes } from 'react'

import styles from '@/components/Button/Button.module.css'

export type ButtonVariant = 'primary' | 'outline'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

/** The two button variants from UI KIT: filled accent and outline. */
function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const variantClass = variant === 'primary' ? styles.primary : styles.outline
  const classes = [styles.base, variantClass, className]
    .filter(Boolean)
    .join(' ')

  return <button type={type} className={classes} {...rest} />
}

export default Button
