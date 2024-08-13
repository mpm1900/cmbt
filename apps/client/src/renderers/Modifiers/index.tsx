import {
  BurnDamageOnTurnEndId,
  BurnedPowerDownId,
  DamageParentOnTurnEndId,
  DefenseUpAllId,
  SetIsStunnedParentId,
  InvertSpeedAllId,
  PhysicalAttackDownParentId,
  PhysicalAttackUpParentId,
  PowerDownAllOtherOnUnitEnterId,
  CreateSandstormOnUnitEnterId,
  SetIsInspectedAllId,
  DamageNewUnitsOnUnitEnterId,
  SandstormOnTurnEndId,
  DefenseDownParentId,
  SetIsProtectedParentId,
  DamageAllOnTurnEnd,
  DamageParentOnTurnEnd,
  PhysicalAttackDownParent,
  CreateSandstormOnUnitEnter,
  DefenseDownParent,
} from '@repo/game/data'
import { ReactNode } from 'react'
import { Modifier } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { MODIFIER_NAMES } from './_names'

export * from './_icons'
export * from './_names'

export type ModifierRenderer = {
  name: ReactNode
  description?: (modifier: Modifier) => ReactNode
}

export const ModifierRenderers: Record<string, ModifierRenderer> = {
  [SetIsInspectedAllId]: {
    name: (
      <span className="text-white">{MODIFIER_NAMES[SetIsInspectedAllId]}</span>
    ),
    description: () => (
      <div className="text-muted-foreground">
        Inspected units' stats are visible.
      </div>
    ),
  },
  [BurnDamageOnTurnEndId]: {
    name: MODIFIER_NAMES[BurnDamageOnTurnEndId],
    description: (mod) => {
      const modifier = mod as DamageParentOnTurnEnd
      return (
        <div>
          <span className="opacity-50 uppercase text-sm font-bold">
            On turn end:{' '}
          </span>
          Afflicted units take {modifier.damage} damage.
        </div>
      )
    },
  },
  [BurnedPowerDownId]: {
    name: MODIFIER_NAMES[BurnedPowerDownId],
    description: (mod) => {
      const modifier = mod as PhysicalAttackDownParent
      return (
        <div>
          Afflicted units' physical attack stats are divided by {modifier.coef}
        </div>
      )
    },
  },
  [DamageParentOnTurnEndId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[BurnDamageOnTurnEndId]}
      </span>
    ),
  },
  [DefenseDownParentId]: {
    name: (
      <span className="text-white">{MODIFIER_NAMES[DefenseDownParentId]}</span>
    ),
    description: (mod) => {
      const modifier = mod as DefenseDownParent
      return (
        <div>Afflicted units' defense stats are divided by {modifier.coef}</div>
      )
    },
  },
  [DefenseUpAllId]: {
    name: MODIFIER_NAMES[DefenseUpAllId],
  },
  [InvertSpeedAllId]: {
    name: MODIFIER_NAMES[InvertSpeedAllId],
  },
  [PhysicalAttackDownParentId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[PhysicalAttackDownParentId]}
      </span>
    ),
    description: (mod) => {
      const modifier = mod as PhysicalAttackDownParent
      return (
        <div>
          Afflicted units' physical attack stats are divided by {modifier.coef}.
        </div>
      )
    },
  },
  [PhysicalAttackUpParentId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[PhysicalAttackUpParentId]}
      </span>
    ),
    description: (mod) => {
      const modifier = mod as PhysicalAttackDownParent
      return (
        <div>
          Afflicted units' physical attack stats are multiplied by{' '}
          {modifier.coef}.
        </div>
      )
    },
  },
  [SetIsProtectedParentId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[SetIsProtectedParentId]}
      </span>
    ),
    description: (mod) => {
      return <div>Protected units are protected from actions.</div>
    },
  },
  [SetIsStunnedParentId]: {
    name: (
      <span className="text-white">{MODIFIER_NAMES[SetIsStunnedParentId]}</span>
    ),
    description: (mod) => {
      return <div>Stunned units cannot act.</div>
    },
  },

  // Triggers
  [CreateSandstormOnUnitEnterId]: {
    name: MODIFIER_NAMES[CreateSandstormOnUnitEnterId],
    description: (mod) => {
      const modifier = mod as CreateSandstormOnUnitEnter
      return (
        <div className="text-muted-foreground">
          <span className="opacity-50 uppercase text-sm font-bold">
            On self enter:{' '}
          </span>
          <span>
            Applies{' '}
            <ModifierInline
              modifier={
                new DamageAllOnTurnEnd({
                  rid: SandstormOnTurnEndId,
                  damage: 30,
                  duration: 5,
                  maxInstances: 1,
                })
              }
            />{' '}
            to all units.
          </span>
        </div>
      )
    },
  },
  [SandstormOnTurnEndId]: {
    name: (
      <span className="text-white">{MODIFIER_NAMES[SandstormOnTurnEndId]}</span>
    ),
    description: (modifier: Modifier) => (
      <div className="text-muted-foreground leading-normal">
        <span className="opacity-50 uppercase text-sm font-bold">
          On turn end:{' '}
        </span>
        Afflicted units take{' '}
        {(modifier as unknown as DamageAllOnTurnEnd).damage} damage.
      </div>
    ),
  },
  [DamageNewUnitsOnUnitEnterId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[DamageNewUnitsOnUnitEnterId]}
      </span>
    ),
  },
  [PowerDownAllOtherOnUnitEnterId]: {
    name: MODIFIER_NAMES[PowerDownAllOtherOnUnitEnterId],
    description: (modifier: Modifier) => (
      <div>
        <span className="opacity-50 uppercase text-sm font-bold">
          On self enter:{' '}
        </span>
        <span>
          Applies{' '}
          <ModifierInline
            modifier={
              new PhysicalAttackDownParent({
                coef: 1.5,
              })
            }
          />{' '}
          to all other units.
        </span>
      </div>
    ),
  },
}
