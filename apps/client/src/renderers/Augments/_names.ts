import {
  FlameShieldId,
  IntimidateId,
  RegenerationId,
  RubyAugmentId,
  SandStreamId,
  ScholarId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'

export const AUGMENT_NAMES: Record<Id, string> = {
  [RubyAugmentId]: 'Ruby',
  [FlameShieldId]: 'Flame Shield',
  [IntimidateId]: 'Intimidate',
  [RegenerationId]: 'Regeneration',
  [SandStreamId]: 'Sand Stream',
  [ScholarId]: 'Scholar',
}
