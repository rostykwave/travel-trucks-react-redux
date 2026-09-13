export type IconName =
  | 'engine'
  | 'transmission'
  | 'form'
  | 'star'
  | 'map-pin'
  | 'close'
  | 'heart'
  | 'heart-filled'

export interface IconProps {
  name: IconName
  size?: number
  className?: string
}

/**
 * Renders an icon from the sprite at public/icons.svg, tinted via CSS `color`.
 *
 * engine/transmission/form are one glyph per category, not per value: the Figma
 * `Icons` component set (48851:894) ships exactly three variants, named after
 * the example card's values (petrol/automatic/alcove) but drawn as generic
 * category symbols. heart/heart-filled come from ionicons, the same set the
 * mockup already sources `ion:close-outline` from — favorites have no Figma
 * reference at all (see ADR-010).
 */
function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} aria-hidden="true">
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}

export default Icon
