import {
  DivineHealingId,
  DraconicAuraId,
  HiddenId,
  InsulatedId,
  RegenerationId,
  RubyAugmentId,
  SandStreamId,
  ScholarId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'

export const AUGMENT_NAMES: Record<Id, string> = {
  [RubyAugmentId]: 'Ruby',

  [DivineHealingId]: 'Divine Healing',
  [DraconicAuraId]: 'Draconic Aura',
  [HiddenId]: 'Hidden',
  [InsulatedId]: 'Insulated',
  [RegenerationId]: 'Regeneration',
  [SandStreamId]: 'Sand Stream',
  [ScholarId]: 'Scholar',
}
