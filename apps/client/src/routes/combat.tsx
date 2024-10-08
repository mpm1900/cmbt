import { Combat } from '@/domain'
import { RouteTransition } from '@shared/RouteTransition'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/combat')({
  component: () => (
    <RouteTransition>
      <Combat />
    </RouteTransition>
  ),
})
