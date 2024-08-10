import { World } from '@/domain'
import { RouteTransition } from '@shared/RouteTransition'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/world')({
  component: () => (
    <RouteTransition>
      <World />
    </RouteTransition>
  ),
})
