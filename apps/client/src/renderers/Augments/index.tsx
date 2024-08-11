import {
  DamageAllOnTurnEnd,
  IntimidateId,
  SandstormOnTurnEndId,
  SandStreamId,
} from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { ReactNode } from 'react'

export type AugmentRenderer = {
  description: () => ReactNode
}

export const AugmentRenderers: Record<Id, AugmentRenderer> = {
  [IntimidateId]: {
    description: () => (
      <>
        When this unit enters, apply{' '}
        <span className="font-bold text-white">Physical Damage Down</span> to
        all other units.
      </>
    ),
  },
  [SandStreamId]: {
    description: () => (
      <div className="space-y-2">
        <div className="text-white">Sand Stream</div>
        <div className="leading-normal">
          This unit gains immunity from{' '}
          <ModifierInline
            modifier={
              new DamageAllOnTurnEnd({ rid: SandstormOnTurnEndId, damage: 30 })
            }
          />{' '}
          triggers. When this unit enters, all units gain{' '}
          <ModifierInline
            modifier={
              new DamageAllOnTurnEnd({ rid: SandstormOnTurnEndId, damage: 30 })
            }
          />{' '}
          for 5 turns.
        </div>
      </div>
    ),
  },
}
