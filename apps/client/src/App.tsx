import { createRouter, RouterProvider } from '@tanstack/react-router'
import { TooltipProvider } from './components/ui/tooltip'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <TooltipProvider>
      <RouterProvider basepath="/cmbt/" router={router} />
    </TooltipProvider>
  )
}

export default App
