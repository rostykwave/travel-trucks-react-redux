import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/app/router'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  )
}

export default App
