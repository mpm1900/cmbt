import { WorldAlt } from '@/domain'
import { RouteTransition } from '@shared/RouteTransition'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/world2')({
  component: () => (
    <RouteTransition>
      <WorldAlt />
    </RouteTransition>
  ),
})
