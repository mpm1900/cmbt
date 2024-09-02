import { BurnId, PoisonId } from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ReactNode } from '@tanstack/react-router'
import { GiPoisonGas } from 'react-icons/gi'
import { HiFire } from 'react-icons/hi2'

export const STATUS_ICONS: Record<Id, ReactNode> = {
  [BurnId]: <HiFire className="fill-status-burn h-full w-full" />,
  [PoisonId]: <GiPoisonGas className="fill-status-poison h-full w-full" />,
}
