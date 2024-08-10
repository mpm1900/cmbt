import { Encounter } from '@/domain/Encounter'
import { RouteTransition } from '@shared/RouteTransition'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/encounter')({
  component: () => (
    <RouteTransition>
      <Encounter />
    </RouteTransition>
  ),
})
