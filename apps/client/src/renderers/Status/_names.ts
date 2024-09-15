import {
  BleedId,
  BurnId,
  ChargeId,
  GuidanceId,
  PoisonId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'

export const STATUS_NAMES: Record<Id, string> = {
  [BleedId]: 'Bleed',
  [BurnId]: 'Burn',
  [ChargeId]: 'Charged',
  [GuidanceId]: 'Guidance',
  [PoisonId]: 'Poison',
}
