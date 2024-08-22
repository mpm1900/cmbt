import { BurnStatusId, PoisonStatusId } from '@repo/game/data'
import { Id } from '@repo/game/types'

export const STATUS_NAMES: Record<Id, string> = {
  [BurnStatusId]: 'Burn',
  [PoisonStatusId]: 'Poison',
}
