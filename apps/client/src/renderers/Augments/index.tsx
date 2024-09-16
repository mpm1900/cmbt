import {
  CursedMiasmaId,
  DamageAllOnTurnEnd,
  DivineHealingId,
  DraconicAuraId,
  FirestormOnTurnEndId,
  InfernoId,
  InsulatedId,
  RegenerationId,
  RubyAugmentId,
  ScholarId,
  TallGrassId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { ReactNode } from 'react'
import { AUGMENT_NAMES } from './_names'

export * from './_names'

export type AugmentRenderer = {
  name: ReactNode
  description?: () => ReactNode
  list?: boolean
}

export const AugmentRenderers: Record<Id, AugmentRenderer> = {
  [DivineHealingId]: {
    name: <div className="text-white">{AUGMENT_NAMES[DivineHealingId]}</div>,
  },
  [DraconicAuraId]: {
    name: <div className="text-white">{AUGMENT_NAMES[DraconicAuraId]}</div>,
  },
  [TallGrassId]: {
    name: <div className="text-white">{AUGMENT_NAMES[TallGrassId]}</div>,
    list: true,
    description: () => (
      <div>
        This unit gains the following for their first 2 turns of combat:
      </div>
    ),
  },
  [InsulatedId]: {
    name: <div className="text-white">{AUGMENT_NAMES[InsulatedId]}</div>,
  },
  [RegenerationId]: {
    name: <div className="text-white">{AUGMENT_NAMES[RegenerationId]}</div>,
  },
  [RubyAugmentId]: {
    name: <div className="text-white">{AUGMENT_NAMES[RubyAugmentId]}</div>,
  },
  [InfernoId]: {
    name: <div className="text-white">{AUGMENT_NAMES[InfernoId]}</div>,
    description: () => (
      <div>
        This unit gains immunity from{' '}
        <ModifierInline
          modifier={
            new DamageAllOnTurnEnd({
              registryId: FirestormOnTurnEndId,
              duration: 5,
              damage: {
                factor: 0.1,
                attackType: 'magic',
                damageType: 'fire',
              },
            })
          }
        />
      </div>
    ),
  },
  [ScholarId]: {
    name: <div className="text-white">{AUGMENT_NAMES[ScholarId]}</div>,
  },
  [CursedMiasmaId]: {
    name: <div className="text-white">{AUGMENT_NAMES[CursedMiasmaId]}</div>,
  },
}
