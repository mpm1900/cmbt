import { RouterProvider } from '@tanstack/react-router'
import { router } from './pages'
import { Combat } from './domain'

function App() {
  return <Combat />
  return <RouterProvider router={router} />
}

export default App
