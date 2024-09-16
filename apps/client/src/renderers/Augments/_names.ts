import {
  CursedMiasmaId,
  DivineHealingId,
  DraconicAuraId,
  InfernoId,
  InsulatedId,
  RegenerationId,
  RubyAugmentId,
  ScholarId,
  TallGrassId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'

export const AUGMENT_NAMES: Record<Id, string> = {
  [RubyAugmentId]: 'Ruby',

  [CursedMiasmaId]: 'Cursed Miasma',
  [DivineHealingId]: 'Divine Healing',
  [DraconicAuraId]: 'Draconic Aura',
  [InsulatedId]: 'Insulated',
  [RegenerationId]: 'Regeneration',
  [InfernoId]: 'Inferno',
  [ScholarId]: 'Scholar',
  [TallGrassId]: 'Tall Grass',
}
