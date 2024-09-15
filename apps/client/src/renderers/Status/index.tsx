import {
  BleedId,
  BurnId,
  ChargeId,
  GuidanceId,
  PoisonId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ReactNode } from '@tanstack/react-router'
import { STATUS_NAMES } from './_names'

export * from './_names'

export type StatusRenderer = {
  name: ReactNode
}

export const StatusRenderers: Record<Id, StatusRenderer> = {
  [BleedId]: {
    name: <span className="text-status-bleed">{STATUS_NAMES[BleedId]}</span>,
  },
  [BurnId]: {
    name: <span className="text-status-burn">{STATUS_NAMES[BurnId]}</span>,
  },
  [ChargeId]: {
    name: <span className="text-status-charge">{STATUS_NAMES[ChargeId]}</span>,
  },
  [GuidanceId]: {
    name: (
      <span className="text-status-guidance">{STATUS_NAMES[GuidanceId]}</span>
    ),
  },
  [PoisonId]: {
    name: <span className="text-status-poison">{STATUS_NAMES[PoisonId]}</span>,
  },
}
