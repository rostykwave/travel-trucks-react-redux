// This module defines route config, not a component tree — react-refresh's
// only-export-components rule doesn't apply, see eslint-plugin-react-refresh docs.
/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from '@/components/Layout/Layout'

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'))
const CatalogPage = lazy(() => import('@/pages/CatalogPage/CatalogPage'))
const CamperDetailsPage = lazy(
  () => import('@/pages/CamperDetailsPage/CamperDetailsPage'),
)
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'catalog/:id', element: <CamperDetailsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
