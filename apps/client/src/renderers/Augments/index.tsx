import {
  CreateSandstormOnUnitEnter,
  DamagePercentAllOnTurnEnd,
  IntimidateId,
  PowerDownAllOtherOnUnitEnter,
  SandstormOnTurnEndId,
  SandStreamId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ModifierDescription } from '@shared/ModifierDescription'
import { ModifierInline } from '@shared/ModifierInline'
import { ReactNode } from 'react'
import { AUGMENT_NAMES } from './_names'

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
              factor: 1.5,
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
            new DamagePercentAllOnTurnEnd({
              rid: SandstormOnTurnEndId,
              factor: 0.1,
            })
          }
        />{' '}
        <ModifierDescription modifier={new CreateSandstormOnUnitEnter({})} />
      </div>
    ),
  },
}
