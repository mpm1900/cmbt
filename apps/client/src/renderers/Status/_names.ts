import { BleedId, BurnId, PoisonId, StasisId } from '@repo/game/data'
import { Id } from '@repo/game/types'

export const STATUS_NAMES: Record<Id, string> = {
  [BleedId]: 'Bleed',
  [BurnId]: 'Burn',
  [PoisonId]: 'Poison',
  [StasisId]: 'Stasis',
}
