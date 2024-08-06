import { Combat } from '@/domain'
import { createFileRoute } from '@tanstack/react-router'
import {Builder} from "@/domain/Builder.tsx";

export const Route = createFileRoute('/')({
  component: () => <Builder />,
})
