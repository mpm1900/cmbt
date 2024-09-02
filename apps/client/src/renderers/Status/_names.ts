import { BurnId, PoisonId } from '@repo/game/data'
import { Id } from '@repo/game/types'

export const STATUS_NAMES: Record<Id, string> = {
  [BurnId]: 'Burn',
  [PoisonId]: 'Poison',
}
