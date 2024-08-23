import {
  FlameShieldId,
  IntimidateId,
  RegenerationId,
  SandStreamId,
  ScholarId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'

export const AUGMENT_NAMES: Record<Id, string> = {
  [FlameShieldId]: 'Flame Shield',
  [IntimidateId]: 'Intimidate',
  [RegenerationId]: 'Regeneration',
  [SandStreamId]: 'Sand Stream',
  [ScholarId]: 'Scholar',
}
