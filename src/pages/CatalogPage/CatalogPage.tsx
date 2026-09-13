import Button from '@/components/Button/Button'
import CamperCard from '@/components/CamperCard/CamperCard'
import FiltersPanel from '@/components/FiltersPanel/FiltersPanel'
import styles from '@/pages/CatalogPage/CatalogPage.module.css'
import fixtures from '@/__fixtures__/campers.json'
import type { CampersResponse } from '@/types/camper'

const { items } = fixtures as CampersResponse

/** Real pagination and filter wiring land in stage 3 (commit 28). */
function CatalogPage() {
  return (
    <div className={styles.page}>
      <FiltersPanel />
      <div>
        <div className={styles.list}>
          {items.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
        <div className={styles.loadMore}>
          <Button variant="outline" disabled>
            Load more
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
