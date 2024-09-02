import { BurnId, PoisonId } from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ReactNode } from '@tanstack/react-router'
import { STATUS_NAMES } from './_names'

export * from './_names'

export type StatusRenderer = {
  name: ReactNode
}

export const StatusRenderers: Record<Id, StatusRenderer> = {
  [BurnId]: {
    name: <span className="text-status-burn">{STATUS_NAMES[BurnId]}</span>,
  },
  [PoisonId]: {
    name: <span className="text-status-poison">{STATUS_NAMES[PoisonId]}</span>,
  },
}
