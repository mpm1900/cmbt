import {
  DivineHealingId,
  DraconicAuraId,
  HiddenId,
  InfernoId,
  InsulatedId,
  RegenerationId,
  RubyAugmentId,
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
  [InfernoId]: 'Inferno',
  [ScholarId]: 'Scholar',
}
