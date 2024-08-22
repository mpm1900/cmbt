import {
  FlameShieldId,
  IntimidateId,
  SandStreamId,
  ScholarId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'

export const AUGMENT_NAMES: Record<Id, string> = {
  [FlameShieldId]: 'Flame Shield',
  [IntimidateId]: 'Intimidate',
  [SandStreamId]: 'Sand Stream',
  [ScholarId]: 'Scholar',
}
