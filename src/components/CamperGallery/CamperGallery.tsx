import { useState } from 'react'

import styles from '@/components/CamperGallery/CamperGallery.module.css'
import type { GalleryImage } from '@/types/camper'

export interface CamperGalleryProps {
  images: GalleryImage[]
  alt: string
}

/** Local-only selection state — purely presentational, no store involved. */
function CamperGallery({ images, alt }: CamperGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [brokenUrls, setBrokenUrls] = useState<Record<string, boolean>>({})

  if (images.length === 0) return null

  const active = images[activeIndex] ?? images[0]
  const markBroken = (url: string) =>
    setBrokenUrls((prev) => ({ ...prev, [url]: true }))

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        {active && !brokenUrls[active.original] ? (
          <img
            src={active.original}
            alt={`${alt} — photo ${activeIndex + 1}`}
            className={styles.mainImage}
            onError={() => markBroken(active.original)}
          />
        ) : (
          <div className={styles.fallback}>No image</div>
        )}
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={image.thumb + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`${styles.thumbnail} ${
                index === activeIndex ? styles.thumbnailActive : ''
              }`}
              aria-label={`Show photo ${index + 1} of ${images.length}`}
              aria-pressed={index === activeIndex}
            >
              {!brokenUrls[image.thumb] ? (
                <img
                  src={image.thumb}
                  alt={`${alt} — thumbnail ${index + 1}`}
                  className={styles.thumbnailImage}
                  onError={() => markBroken(image.thumb)}
                />
              ) : (
                <div className={styles.fallback}>No image</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CamperGallery
