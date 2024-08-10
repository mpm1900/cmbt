import { createFileRoute } from '@tanstack/react-router'
import { Builder } from '@/domain'
import { RouteTransition } from '@shared/RouteTransition'

export const Route = createFileRoute('/')({
  component: () => (
    <RouteTransition>
      <Builder />
    </RouteTransition>
  ),
})
