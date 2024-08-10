import { IntimidateId, SandStreamId } from '@repo/game/data'
import { Id } from '@repo/game/types'
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
      <>
        When this unit enters, create a{' '}
        <span className="font-bold text-white">Sandstorm</span> for 5 turns.
        This unit gains immunity from{' '}
        <span className="font-bold text-white">Sandstorm</span> triggers.
      </>
    ),
  },
}
