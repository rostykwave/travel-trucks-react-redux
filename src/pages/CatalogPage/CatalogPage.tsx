import { useEffect } from 'react'

import Button from '@/components/Button/Button'
import CamperCard from '@/components/CamperCard/CamperCard'
import CamperCardSkeleton from '@/components/CamperCardSkeleton/CamperCardSkeleton'
import CatalogEmptyState from '@/components/CatalogEmptyState/CatalogEmptyState'
import CatalogErrorState from '@/components/CatalogErrorState/CatalogErrorState'
import FiltersPanel from '@/components/FiltersPanel/FiltersPanel'
import Loader from '@/components/Loader/Loader'
import { CAMPERS_PER_PAGE } from '@/constants/campers'
import { fetchCampers, resetCampers } from '@/features/campers/campersSlice'
import {
  selectCampers,
  selectCampersPage,
  selectCampersStatus,
  selectHasMoreCampers,
} from '@/features/campers/selectors'
import { useCampersFilters } from '@/features/filters/useCampersFilters'
import styles from '@/pages/CatalogPage/CatalogPage.module.css'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

function CatalogPage() {
  const dispatch = useAppDispatch()
  const { filters } = useCampersFilters()
  const items = useAppSelector(selectCampers)
  const status = useAppSelector(selectCampersStatus)
  const page = useAppSelector(selectCampersPage)
  const hasMore = useAppSelector(selectHasMoreCampers)

  useEffect(() => {
    // Direct requirement: the old list must disappear before the new one
    // arrives, not just get replaced once the fetch resolves.
    dispatch(resetCampers())
    const promise = dispatch(
      fetchCampers({ ...filters, page: 1, limit: CAMPERS_PER_PAGE }),
    )
    return () => promise.abort()
  }, [dispatch, filters])

  const isInitialLoad = status === 'loading' && items.length === 0
  const isLoadingMore = status === 'loading' && items.length > 0

  const handleLoadMore = () => {
    void dispatch(
      fetchCampers({ ...filters, page: page + 1, limit: CAMPERS_PER_PAGE }),
    )
  }

  const renderContent = () => {
    if (isInitialLoad) {
      return (
        <div className={styles.list}>
          {Array.from({ length: CAMPERS_PER_PAGE }, (_, index) => (
            <CamperCardSkeleton key={index} />
          ))}
        </div>
      )
    }

    if (status === 'failed') {
      return (
        <CatalogErrorState
          onRetry={() => {
            void dispatch(
              fetchCampers({ ...filters, page: 1, limit: CAMPERS_PER_PAGE }),
            )
          }}
        />
      )
    }

    if (status === 'succeeded' && items.length === 0) {
      return <CatalogEmptyState />
    }

    return (
      <>
        <div className={styles.list}>
          {items.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
        {isLoadingMore ? (
          <div className={styles.loadMore}>
            <Loader size={32} />
          </div>
        ) : (
          hasMore && (
            <div className={styles.loadMore}>
              <Button variant="outline" onClick={handleLoadMore}>
                Load more
              </Button>
            </div>
          )
        )}
      </>
    )
  }

  return (
    <div className={styles.page}>
      <FiltersPanel />
      <div>{renderContent()}</div>
    </div>
  )
}

export default CatalogPage
