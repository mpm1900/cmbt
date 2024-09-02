import {
  AttackDownAllOtherOnUnitEnterId,
  AttackDownParentId,
  AttackUpParentId,
  CreateSandstormOnUnitEnterId,
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
import { DefenseDownParentRenderer } from './DefenseDownParent'
import { DisabledParentRenderer } from './DisabledParent'
import { FireDamageUpParentRenderer } from './FireDamageUpParent'
import { FireNegationUpParentRenderer } from './FireNegationUpParent'
import { InspectedAllRenderer } from './InspectedAll'
import { InvertSpeedAllRenderer } from './InvertSpeedAll'
import { ProtectedParentRenderer } from './ProtectedParent'
import { SpeedUpTeamRenderer } from './SpeedUpTeam'
import { StunnedParentRenderer } from './StunnedParent'
import { AttackDownAllOtherOnUnitEnterRenderer } from './Triggers/AttackDownAllOtherOnUnitEnter'
import { CreateSandstormOnUnitEnterRenderer } from './Triggers/CreateSandstormOnUnitEnter'
import { DamageAllOnTurnEndRenderer } from './Triggers/DamageAllOnTurnEnd'
import { DamageNewUnitsOnUnitEnterRenderer } from './Triggers/DamageNewUnitsOnUnitEnter'
import { DamageParentOnTurnEndRenderer } from './Triggers/DamageParentOnTurnEnd'

export * from './_icons'
export * from './_names'

export type ModifierRenderer = {
  name: (modifier: Modifier) => ReactNode
  description?: (modifier: Modifier) => ReactNode
}

export const ModifierRenderers: Record<string, ModifierRenderer> = {
  [AttackDownParentId]: AttackDownParentRenderer,
  [AttackUpParentId]: AttackUpParentRenderer,
  [DefenseDownParentId]: DefenseDownParentRenderer,
  [DisabledParentId]: DisabledParentRenderer,
  [FireDamageUpParentId]: FireDamageUpParentRenderer,
  [FireNegationUpParentId]: FireNegationUpParentRenderer,
  [InspectedAllId]: InspectedAllRenderer,
  [InvertSpeedAllId]: InvertSpeedAllRenderer,
  [ProtectedParentId]: ProtectedParentRenderer,
  [SpeedUpTeamId]: SpeedUpTeamRenderer,
  [StunnedParentId]: StunnedParentRenderer,

  // Triggers
  [AttackDownAllOtherOnUnitEnterId]: AttackDownAllOtherOnUnitEnterRenderer,
  [CreateSandstormOnUnitEnterId]: CreateSandstormOnUnitEnterRenderer,
  [DamageAllOnTurnEndId]: DamageAllOnTurnEndRenderer,
  [DamageNewUnitsOnUnitEnterId]: DamageNewUnitsOnUnitEnterRenderer,
  [DamageParentOnTurnEndId]: DamageParentOnTurnEndRenderer,
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
}
