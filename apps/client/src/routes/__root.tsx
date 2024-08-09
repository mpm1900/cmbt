import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'

export const Route = createRootRoute({
  component: () => (
    <>
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})
