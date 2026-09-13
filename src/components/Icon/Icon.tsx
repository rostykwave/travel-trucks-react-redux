export type IconName =
  | 'fuel-petrol'
  | 'transmission-automatic'
  | 'form-alcove'
  | 'star'
  | 'map-pin'
  | 'close'

export interface IconProps {
  name: IconName
  size?: number
  className?: string
}

/** Renders an icon from the sprite at public/icons.svg, tinted via CSS `color`. */
function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} aria-hidden="true">
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}

export default Icon
