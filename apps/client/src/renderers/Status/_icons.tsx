import { BleedId, BurnId, PoisonId, StasisId } from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ReactNode } from '@tanstack/react-router'
import { GiBlood, GiLinkedRings, GiPoisonGas } from 'react-icons/gi'
import { HiFire } from 'react-icons/hi2'

export const STATUS_ICONS: Record<Id, ReactNode> = {
  [BleedId]: <GiBlood className="fill-status-bleed h-full w-full" />,
  [BurnId]: <HiFire className="fill-status-burn h-full w-full" />,
  [PoisonId]: <GiPoisonGas className="fill-status-poison h-full w-full" />,
  [StasisId]: <GiLinkedRings className="fill-status-stasis h-full w-full" />,
}
