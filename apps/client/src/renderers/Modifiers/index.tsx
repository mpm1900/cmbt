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
  DisabledParentId,
  FireDamageUpParentId,
  FireNegationUpParentId,
  HealParentOnUnitSwitch,
  HealParentOnUnitSwitchId,
  InspectAllOnUnitEnterId,
  InspectedAll,
  InspectedAllId,
  InvertSpeedAllId,
  ProtectedParentId,
  SandstormOnTurnEndId,
  SpeedUpTeamId,
  StunnedParentId,
} from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { ReactNode } from 'react'
import { ModifierName, TriggerName } from './_helpers'
import { MODIFIER_NAMES } from './_names'
import { AttackDownParentRenderer } from './AttackDownParent'
import { AttackUpParentRenderer } from './AttackUpParent'
import { DamageAllOnTurnEndRenderer } from './DamageAllOnTurnEnd'
import { DamageNewUnitsOnUnitEnterRenderer } from './DamageNewUnitsOnUnitEnter'
import { DamageParentOnTurnEndRenderer } from './DamageParentOnTurnEnd'
import { DefenseDownParentRenderer } from './DefenseDownParent'
import { DisabledParentRenderer } from './DisabledParent'
import { FireDamageUpParentRenderer } from './FireDamageUpParent'
import { FireNegationUpParentRenderer } from './FireNegationUpParent'
import { InspectedAllRenderer } from './InspectedAll'
import { ProtectedParentRenderer } from './ProtectedParent'
import { SpeedUpTeamRenderer } from './SpeedUpTeam'
import { StunnedParentRenderer } from './StunnedParent'

export * from './_icons'
export * from './_names'

export type ModifierRenderer = {
  name: (modifier: Modifier) => ReactNode
  description?: (modifier: Modifier) => ReactNode
}

export const ModifierRenderers: Record<string, ModifierRenderer> = {
  [AttackDownParentId]: AttackDownParentRenderer,
  [AttackUpParentId]: AttackUpParentRenderer,
  [DamageAllOnTurnEndId]: DamageAllOnTurnEndRenderer,
  [DamageNewUnitsOnUnitEnterId]: DamageNewUnitsOnUnitEnterRenderer,
  [DamageParentOnTurnEndId]: DamageParentOnTurnEndRenderer,
  [DefenseDownParentId]: DefenseDownParentRenderer,
  [DisabledParentId]: DisabledParentRenderer,
  [FireDamageUpParentId]: FireDamageUpParentRenderer,
  [FireNegationUpParentId]: FireNegationUpParentRenderer,
  [InspectedAllId]: InspectedAllRenderer,
  [ProtectedParentId]: ProtectedParentRenderer,
  [SpeedUpTeamId]: SpeedUpTeamRenderer,
  [StunnedParentId]: StunnedParentRenderer,

  [InvertSpeedAllId]: {
    name: () => <ModifierName>{MODIFIER_NAMES[InvertSpeedAllId]}</ModifierName>,
    description: (mod) => (
      <div>Afflicted units' speed stats are multiplied by -1.</div>
    ),
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
                  factor: modifier.damageFactor,
                  duration: modifier.duration,
                })
              }
            />{' '}
            to all units for {modifier.duration} turns.
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
