import { Combat } from '@/domain'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <Combat />,
})
