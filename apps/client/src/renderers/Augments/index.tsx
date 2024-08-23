import {
  CreateSandstormOnUnitEnter,
  DamagePercentAllOnTurnEnd,
  FireNegationUpParent,
  FlameShieldId,
  HealParentOnUnitSwitch,
  InspectAllOnUnitEnter,
  IntimidateId,
  PowerDownAllOtherOnUnitEnter,
  RegenerationId,
  SandstormOnTurnEndId,
  SandStreamId,
  ScholarId,
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
  [RegenerationId]: {
    name: <div className="text-white">{AUGMENT_NAMES[RegenerationId]}</div>,
    description: () => (
      <div>
        <ModifierDescription
          modifier={
            new HealParentOnUnitSwitch({
              factor: 0.3,
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
  [ScholarId]: {
    name: <div className="text-white">{AUGMENT_NAMES[ScholarId]}</div>,
    description: () => (
      <div>
        <ModifierDescription modifier={new InspectAllOnUnitEnter({})} />
      </div>
    ),
  },
}
