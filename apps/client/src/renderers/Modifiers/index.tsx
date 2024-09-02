import {
  AttackDownAllOtherOnUnitEnterId,
  AttackDownParent,
  AttackDownParentId,
  AttackUpParentId,
  CreateSandstormOnUnitEnter,
  CreateSandstormOnUnitEnterId,
  DamageAllOnTurnEnd,
  DamageAllOnTurnEndId,
  DamageNewUnitsOnUnitEnterId,
  DamageParentOnTurnEndId,
  DefenseDownParentId,
  FireDamageUpParent,
  FireDamageUpParentId,
  FireNegationUpParent,
  FireNegationUpParentId,
  HealParentOnUnitSwitch,
  HealParentOnUnitSwitchId,
  InspectAllOnUnitEnterId,
  InspectedAll,
  InspectedAllId,
  InvertSpeedAllId,
  ProtectedParentId,
  SandstormOnTurnEndId,
  SpeedUpTeam,
  SpeedUpTeamId,
  StunnedParentId,
} from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { ReactNode } from 'react'
import { ModifierName, ModifierValuesPercent, TriggerName } from './_helpers'
import { MODIFIER_NAMES } from './_names'
import { AttackDownParentRenderer } from './AttackDownParent'
import { DamageAllOnTurnEndRenderer } from './DamageAllOnTurnEnd'
import { DamageNewUnitsOnUnitEnterRenderer } from './DamageNewUnitsOnUnitEnter'
import { DamageParentOnTurnEndRenderer } from './DamageParentOnTurnEnd'
import { DefenseDownParentRenderer } from './DefenseDownParent'
import { InspectedAllRenderer } from './InspectedAll'
import { ProtectedParentRenderer } from './ProtectedParent'
import { StunnedParentRenderer } from './StunnedParent'

export * from './_icons'
export * from './_names'

export type ModifierRenderer = {
  name: (modifier: Modifier) => ReactNode
  description?: (modifier: Modifier) => ReactNode
}

export const ModifierRenderers: Record<string, ModifierRenderer> = {
  [AttackDownParentId]: AttackDownParentRenderer,
  [DamageAllOnTurnEndId]: DamageAllOnTurnEndRenderer,
  [DamageNewUnitsOnUnitEnterId]: DamageNewUnitsOnUnitEnterRenderer,
  [DamageParentOnTurnEndId]: DamageParentOnTurnEndRenderer,
  [DefenseDownParentId]: DefenseDownParentRenderer,
  [InspectedAllId]: InspectedAllRenderer,
  [ProtectedParentId]: ProtectedParentRenderer,
  [StunnedParentId]: StunnedParentRenderer,

  [FireDamageUpParentId]: {
    name: () => (
      <ModifierName>{MODIFIER_NAMES[FireDamageUpParentId]}</ModifierName>
    ),
    description: (mod) => {
      const modifier = mod as FireDamageUpParent
      return (
        <ModifierValuesPercent
          factor={modifier.factor}
          static={modifier.static}
        >
          Fire Damage
        </ModifierValuesPercent>
      )
    },
  },
  [FireNegationUpParentId]: {
    name: () => (
      <ModifierName>{MODIFIER_NAMES[FireNegationUpParentId]}</ModifierName>
    ),
    description: (mod) => {
      const modifier = mod as FireNegationUpParent
      return (
        <div>
          {modifier.factor !== 0 && (
            <div>×{modifier.factor + 1} Fire damage negation.</div>
          )}
          {modifier.static !== 0 && (
            <div>
              {modifier.static > 0 ? '+' : ''}
              {modifier.static * 100}% Fire damage negation.
            </div>
          )}
        </div>
      )
    },
  },
  [InvertSpeedAllId]: {
    name: () => <ModifierName>{MODIFIER_NAMES[InvertSpeedAllId]}</ModifierName>,
    description: (mod) => (
      <div>Afflicted units' speed stats are multiplied by -1.</div>
    ),
  },

  [AttackUpParentId]: {
    name: () => <ModifierName>{MODIFIER_NAMES[AttackUpParentId]}</ModifierName>,
    description: (mod) => {
      const modifier = mod as AttackDownParent
      return (
        <div>
          {modifier.factor > 0 ? '+' : '-'}
          {Math.abs(modifier.factor) * 100}% Attack.
        </div>
      )
    },
  },

  [SpeedUpTeamId]: {
    name: () => <ModifierName>{MODIFIER_NAMES[SpeedUpTeamId]}</ModifierName>,
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
    name: () => MODIFIER_NAMES[CreateSandstormOnUnitEnterId],
    description: (mod) => {
      const modifier = mod as CreateSandstormOnUnitEnter
      return (
        <div className="space-x-2">
          <TriggerName>On self enter:</TriggerName>
          <span>
            Applies{' '}
            <ModifierInline
              modifier={
                new DamageAllOnTurnEnd({
                  registryId: SandstormOnTurnEndId,
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
    name: () => (
      <ModifierName>{MODIFIER_NAMES[HealParentOnUnitSwitchId]}</ModifierName>
    ),
    description: (modifier: Modifier) => (
      <div className="space-x-2">
        <TriggerName>On self switch out:</TriggerName>
        This unit heals{' '}
        {(modifier as unknown as HealParentOnUnitSwitch).factor * 100}% of their
        max health.
      </div>
    ),
  },

  [InspectAllOnUnitEnterId]: {
    name: () => (
      <ModifierName>{MODIFIER_NAMES[InspectAllOnUnitEnterId]}</ModifierName>
    ),
    description: (modifier: Modifier) => (
      <div className="space-x-2">
        <TriggerName>On self enter:</TriggerName>
        <span>
          Applies <ModifierInline modifier={new InspectedAll({})} /> to all
          units.
        </span>
      </div>
    ),
  },
  [AttackDownAllOtherOnUnitEnterId]: {
    name: () => (
      <ModifierName>
        {MODIFIER_NAMES[AttackDownAllOtherOnUnitEnterId]}
      </ModifierName>
    ),
    description: (modifier: Modifier) => (
      <div className="space-x-2">
        <TriggerName>On self enter:</TriggerName>
        <span>
          Applies{' '}
          <ModifierInline
            modifier={
              new AttackDownParent({
                factor: (modifier as AttackDownParent).factor,
              })
            }
          />{' '}
          to all other active units.
        </span>
      </div>
    ),
  },
}
