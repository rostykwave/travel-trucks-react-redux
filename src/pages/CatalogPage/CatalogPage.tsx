import { useEffect } from 'react'
import toast from 'react-hot-toast'

import Button from '@/components/Button/Button'
import CamperCard from '@/components/CamperCard/CamperCard'
import CatalogEmptyState from '@/components/CatalogEmptyState/CatalogEmptyState'
import CatalogLoadingModal from '@/components/CatalogLoadingModal/CatalogLoadingModal'
import ErrorState from '@/components/ErrorState/ErrorState'
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
import { setFilters } from '@/features/filters/filtersSlice'
import { selectFilters } from '@/features/filters/selectors'
import { useCampersFilters } from '@/features/filters/useCampersFilters'
import styles from '@/pages/CatalogPage/CatalogPage.module.css'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

function CatalogPage() {
  const dispatch = useAppDispatch()
  const { filters: urlFilters, setFilters: setUrlFilters } = useCampersFilters()
  // Read back from the store rather than closing over the URL, so Load More and
  // Retry always use the filter set the current list was actually built from.
  const filters = useAppSelector(selectFilters)
  const items = useAppSelector(selectCampers)
  const status = useAppSelector(selectCampersStatus)
  const page = useAppSelector(selectCampersPage)
  const hasMore = useAppSelector(selectHasMoreCampers)

  useEffect(() => {
    // The URL is the entry point; the store holds the active filter set (ADR-011).
    // Both happen in this one effect so the request and the stored filters can
    // never disagree, and entering on a filtered URL still fires a single fetch.
    dispatch(setFilters(urlFilters))
    // Direct requirement: the old list must disappear before the new one
    // arrives, not just get replaced once the fetch resolves.
    dispatch(resetCampers())
    const promise = dispatch(
      fetchCampers({ ...urlFilters, page: 1, limit: CAMPERS_PER_PAGE }),
    )
    return () => promise.abort()
  }, [dispatch, urlFilters])

  const isInitialLoad = status === 'loading' && items.length === 0
  const isLoadingMore = status === 'loading' && items.length > 0

  // A failed page keeps the list that is already on screen; only the initial
  // load falls back to the full-page error state.
  const handleLoadMore = async () => {
    const action = await dispatch(
      fetchCampers({ ...filters, page: page + 1, limit: CAMPERS_PER_PAGE }),
    )
    if (fetchCampers.rejected.match(action) && !action.meta.aborted) {
      toast.error("We couldn't load more campers. Please try again.")
    }
  }

  const renderContent = () => {
    if (isInitialLoad) {
      return <CatalogLoadingModal />
    }

    if (status === 'failed' && items.length === 0) {
      return (
        <ErrorState
          message="We couldn't load the campers. Check your connection and try again."
          onRetry={() => {
            void dispatch(
              fetchCampers({ ...filters, page: 1, limit: CAMPERS_PER_PAGE }),
            )
          }}
        />
      )
    }

    if (status === 'succeeded' && items.length === 0) {
      return <CatalogEmptyState onClearFilters={() => setUrlFilters({})} />
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
              <Button variant="outline" onClick={() => void handleLoadMore()}>
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
      <h1 className="sr-only">Camper catalog</h1>
      <FiltersPanel />
      <div className={styles.content}>{renderContent()}</div>
    </div>
  )
}

export default CatalogPage
