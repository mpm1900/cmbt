import {
  CreateSandstormOnUnitEnter,
  DamagePercentAllOnTurnEnd,
  FireNegationUpParent,
  FlameShieldId,
  InspectAllOnUnitEnter,
  IntimidateId,
  PowerDownAllOtherOnUnitEnter,
  SandstormOnTurnEndId,
  SandStreamId,
  SizeUpId,
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
  [FlameShieldId]: {
    name: <div className="text-white">{AUGMENT_NAMES[FlameShieldId]}</div>,
    description: () => (
      <div>
        <ModifierDescription
          modifier={
            new FireNegationUpParent({
              offset: 0.5,
            })
          }
        />
      </div>
    ),
  },
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
  [SizeUpId]: {
    name: <div className="text-white">{AUGMENT_NAMES[SizeUpId]}</div>,
    description: () => (
      <div>
        <ModifierDescription modifier={new InspectAllOnUnitEnter({})} />
      </div>
    ),
  },
}
