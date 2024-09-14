import {
  DamageAllOnTurnEnd,
  DivineHealingId,
  DraconicAuraId,
  FirestormOnTurnEndId,
  HiddenId,
  InfernoId,
  InsulatedId,
  RegenerationId,
  RubyAugmentId,
  ScholarId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { ReactNode } from 'react'
import { AUGMENT_NAMES } from './_names'

export * from './_names'

export type AugmentRenderer = {
  name: ReactNode
  description?: () => ReactNode
}

export const AugmentRenderers: Record<Id, AugmentRenderer> = {
  [DivineHealingId]: {
    name: <div className="text-white">{AUGMENT_NAMES[DivineHealingId]}</div>,
  },
  [DraconicAuraId]: {
    name: <div className="text-white">{AUGMENT_NAMES[DraconicAuraId]}</div>,
  },
  [HiddenId]: {
    name: <div className="text-white">{AUGMENT_NAMES[HiddenId]}</div>,
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
              factor: 0.1,
              duration: 5,
              damageType: 'fire',
            })
          }
        />
      </div>
    ),
  },
  [ScholarId]: {
    name: <div className="text-white">{AUGMENT_NAMES[ScholarId]}</div>,
  },
}
