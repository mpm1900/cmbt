import {
  DamagePercentAllOnTurnEnd,
  FlameShieldId,
  IntimidateId,
  RegenerationId,
  RubyAugmentId,
  SandstormOnTurnEndId,
  SandStreamId,
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
  [FlameShieldId]: {
    name: <div className="text-white">{AUGMENT_NAMES[FlameShieldId]}</div>,
  },
  [IntimidateId]: {
    name: <div className="text-white">{AUGMENT_NAMES[IntimidateId]}</div>,
  },
  [RegenerationId]: {
    name: <div className="text-white">{AUGMENT_NAMES[RegenerationId]}</div>,
  },
  [RubyAugmentId]: {
    name: <div className="text-white">{AUGMENT_NAMES[RubyAugmentId]}</div>,
  },
  [SandStreamId]: {
    name: <div className="text-white">{AUGMENT_NAMES[SandStreamId]}</div>,
    description: () => (
      <div>
        This unit gains immunity from{' '}
        <ModifierInline
          modifier={
            new DamagePercentAllOnTurnEnd({
              rid: SandstormOnTurnEndId,
              factor: 0.1,
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
