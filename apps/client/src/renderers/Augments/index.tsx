import {
  CreateSandstormOnUnitEnter,
  DamageAllOnTurnEnd,
  IntimidateId,
  PowerDownAllOtherOnUnitEnter,
  SandstormOnTurnEndId,
  SandStreamId,
  ZERO_UNIT,
} from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { ReactNode } from 'react'
import { AUGMENT_NAMES } from './_names'
import { ModifierDescription } from '@shared/ModifierDescription'

export * from './_names'

export type AugmentRenderer = {
  name: ReactNode
  description: () => ReactNode
}

export const AugmentRenderers: Record<Id, AugmentRenderer> = {
  [IntimidateId]: {
    name: <div className="text-white">{AUGMENT_NAMES[IntimidateId]}</div>,
    description: () => (
      <div>
        <ModifierDescription
          modifier={
            new PowerDownAllOtherOnUnitEnter({
              coef: 1.5,
              duration: 0,
            })
          }
        />
      </div>
    ),
  },
  [SandStreamId]: {
    name: <div className="text-white">{AUGMENT_NAMES[SandStreamId]}</div>,
    description: () => (
      <div>
        This unit gains immunity from{' '}
        <ModifierInline
          modifier={
            new DamageAllOnTurnEnd({ rid: SandstormOnTurnEndId, damage: 30 })
          }
        />{' '}
        <ModifierDescription modifier={new CreateSandstormOnUnitEnter({})} />
      </div>
    ),
  },
}
