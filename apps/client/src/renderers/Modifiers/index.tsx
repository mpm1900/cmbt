import {
  BurnDamageOnTurnEndId,
  BurnedPowerDownId,
  CreateSandstormOnUnitEnter,
  CreateSandstormOnUnitEnterId,
  DamageNewUnitsOnUnitEnter,
  DamageNewUnitsOnUnitEnterId,
  DamageParentOnTurnEndId,
  DamagePercentAllOnTurnEnd,
  DamagePercentParentOnTurnEnd,
  DefenseDownParent,
  DefenseDownParentId,
  DefenseUpAllId,
  FireDamageUpParent,
  FireDamageUpParentId,
  FireNegationUpParent,
  FireNegationUpParentId,
  HealParentOnUnitSwitchId,
  InspectAllOnUnitEnterId,
  InvertSpeedAllId,
  PhysicalAttackDownParent,
  PhysicalAttackDownParentId,
  PhysicalAttackUpParentId,
  PoisonedDamageOnTurnEndId,
  PowerDownAllOtherOnUnitEnterId,
  SandstormOnTurnEndId,
  SetIsInspectedAll,
  SetIsInspectedAllId,
  SetIsProtectedParentId,
  SetIsStunnedParentId,
  SpeedUpTeam,
  SpeedUpTeamId,
} from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { ReactNode } from 'react'
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
      const modifier = mod as DamagePercentParentOnTurnEnd
      return (
        <div>
          <span className="opacity-50 uppercase text-sm font-bold">
            On turn end:{' '}
          </span>
          Afflicted unit takes {(modifier.factor * 100).toFixed(1)}% damage.
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
          Afflicted unit's physical attack stat is divided by {modifier.factor}
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
        <div>Afflicted unit's defense stat is divided by {modifier.factor}</div>
      )
    },
  },
  [DefenseUpAllId]: {
    name: MODIFIER_NAMES[DefenseUpAllId],
  },
  [FireDamageUpParentId]: {
    name: MODIFIER_NAMES[FireDamageUpParentId],
    description: (mod) => {
      const modifier = mod as FireDamageUpParent
      return (
        <div>
          {modifier.dynamic !== 0 && (
            <div>
              {modifier.dynamic > 0 ? '+' : '-'}
              {modifier.dynamic * 100}% Fire damage.
            </div>
          )}
          {modifier.factor !== 1 && (
            <div>
              Afflicted unit's fire damage is multiplied by {modifier.factor}.
            </div>
          )}
        </div>
      )
    },
  },
  [FireNegationUpParentId]: {
    name: MODIFIER_NAMES[FireNegationUpParentId],
    description: (mod) => {
      const modifier = mod as FireNegationUpParent
      return (
        <div>
          {modifier.dynamic !== 0 && (
            <div>
              {modifier.dynamic > 0 ? '+' : '-'}
              {modifier.dynamic * 100}% of Fire damage negation.
            </div>
          )}
          {modifier.static !== 0 && (
            <div>
              {modifier.static > 0 ? '+' : '-'}
              {modifier.static * 100}% Fire damage negation.
            </div>
          )}
          {modifier.factor !== 1 && (
            <div>
              Afflicted unit's fire damage negation is multiplied by{' '}
              {modifier.factor}.
            </div>
          )}
        </div>
      )
    },
  },
  [InvertSpeedAllId]: {
    name: (
      <span className="text-white">{MODIFIER_NAMES[InvertSpeedAllId]}</span>
    ),
    description: (mod) => (
      <div>Afflicted units' speed stats are multiplied by -1.</div>
    ),
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
          Afflicted unit's physical attack stat is divided by {modifier.factor}.
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
          Afflicted unit's physical attack stat is multiplied by{' '}
          {modifier.factor}.
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
  [SpeedUpTeamId]: {
    name: <span className="text-white">{MODIFIER_NAMES[SpeedUpTeamId]}</span>,
    description: (mod) => {
      const modifier = mod as SpeedUpTeam
      return (
        <div>
          Afflicted unit's speed stat is multiplied by {modifier.factor}.
        </div>
      )
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
                new DamagePercentAllOnTurnEnd({
                  rid: SandstormOnTurnEndId,
                  factor: 0.1,
                  duration: 5,
                  maxInstances: 1,
                })
              }
            />{' '}
            to all units for 5 turns.
          </span>
        </div>
      )
    },
  },
  [HealParentOnUnitSwitchId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[HealParentOnUnitSwitchId]}
      </span>
    ),
    description: (modifier: Modifier) => (
      <div className="text-muted-foreground">
        <span className="opacity-50 uppercase text-sm font-bold">
          On self switch out:{' '}
        </span>
        This unit heals{' '}
        {(modifier as unknown as DamagePercentAllOnTurnEnd).factor * 100}% of
        their health.
      </div>
    ),
  },
  [PoisonedDamageOnTurnEndId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[PoisonedDamageOnTurnEndId]}
      </span>
    ),
    description: (modifier: Modifier) => (
      <div className="text-muted-foreground">
        <span className="opacity-50 uppercase text-sm font-bold">
          On turn end:{' '}
        </span>
        Afflicted units take{' '}
        {(modifier as unknown as DamagePercentAllOnTurnEnd).factor * 100}%
        damage.
      </div>
    ),
  },
  [SandstormOnTurnEndId]: {
    name: (
      <span className="text-white">{MODIFIER_NAMES[SandstormOnTurnEndId]}</span>
    ),
    description: (modifier: Modifier) => (
      <div className="text-muted-foreground">
        <span className="opacity-50 uppercase text-sm font-bold">
          On turn end:{' '}
        </span>
        Afflicted units take{' '}
        {(modifier as unknown as DamagePercentAllOnTurnEnd).factor * 100}%
        damage.
      </div>
    ),
  },
  [DamageNewUnitsOnUnitEnterId]: {
    name: (
      <span className="text-white">
        {MODIFIER_NAMES[DamageNewUnitsOnUnitEnterId]}
      </span>
    ),
    description: (modifier: Modifier) => (
      <div className="text-muted-foreground">
        <span className="opacity-50 uppercase text-sm font-bold">
          On unit enter:{' '}
        </span>
        That unit takes{' '}
        {(modifier as unknown as DamageNewUnitsOnUnitEnter).damage} damage.
      </div>
    ),
  },
  [InspectAllOnUnitEnterId]: {
    name: MODIFIER_NAMES[InspectAllOnUnitEnterId],
    description: (modifier: Modifier) => (
      <div>
        <span className="opacity-50 uppercase text-sm font-bold">
          On self enter:{' '}
        </span>
        <span>
          Applies <ModifierInline modifier={new SetIsInspectedAll({})} /> to all
          units.
        </span>
      </div>
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
                factor: 1.5,
              })
            }
          />{' '}
          to all other active units.
        </span>
      </div>
    ),
  },
}
