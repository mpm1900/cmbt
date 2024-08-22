import { BurnStatusId, PoisonedStatusId } from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ReactNode } from '@tanstack/react-router'
import { STATUS_NAMES } from './_names'

export * from './_names'

export type StatusRenderer = {
  name: ReactNode
}

export const StatusRenderers: Record<Id, StatusRenderer> = {
  [BurnStatusId]: {
    name: (
      <span className="text-modifiers-burn">{STATUS_NAMES[BurnStatusId]}</span>
    ),
  },
  [PoisonedStatusId]: {
    name: (
      <span className="text-modifiers-poison">
        {STATUS_NAMES[PoisonedStatusId]}
      </span>
    ),
  },
}
