import {
  AddActionParentId,
  AttackDownAllOtherOnUnitEnterId,
  CreateSandstormOnUnitEnterId,
  DamageAllOnTurnEndId,
  DamageNewUnitsOnUnitEnterId,
  DamageParentOnTurnEndId,
  DisabledParentId,
  HealParentOnTurnEndId,
  HealParentOnUnitSwitchId,
  HexedParentId,
  InspectAllOnUnitEnterId,
  InspectedAll,
  InspectedAllId,
  InvertSpeedAllId,
  ProtectedParentId,
  StunnedParentId,
  UpdateStatParentId,
} from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { ReactNode } from 'react'
import { ModifierName, TriggerName } from './_helpers'
import { MODIFIER_NAMES } from './_names'
import { AddActionParentRenderer } from './AddActionParent'
import { DisabledParentRenderer } from './DisabledParent'
import { HexedParentRenderer } from './HexedParent'
import { InspectedAllRenderer } from './InspectedAll'
import { InvertSpeedAllRenderer } from './InvertSpeedAll'
import { ProtectedParentRenderer } from './ProtectedParent'
import { StunnedParentRenderer } from './StunnedParent'
import { AttackDownAllOtherOnUnitEnterRenderer } from './Triggers/AttackDownAllOtherOnUnitEnter'
import { CreateSandstormOnUnitEnterRenderer } from './Triggers/CreateSandstormOnUnitEnter'
import { DamageAllOnTurnEndRenderer } from './Triggers/DamageAllOnTurnEnd'
import { DamageNewUnitsOnUnitEnterRenderer } from './Triggers/DamageNewUnitsOnUnitEnter'
import { DamageParentOnTurnEndRenderer } from './Triggers/DamageParentOnTurnEnd'
import { HealParentOnTurnEndRenderer } from './Triggers/HealParentOnTurnEnd'
import { HealParentOnUnitSwitchRenderer } from './Triggers/HealParentOnUnitSwitch'
import { UpdateStatParentRenderer } from './UpdateStatParent'

export * from './_icons'
export * from './_names'

export type ModifierRenderer = {
  name: (modifier: Modifier) => ReactNode
  description?: (modifier: Modifier) => ReactNode
}

export const ModifierRenderers: Record<string, ModifierRenderer> = {
  [AddActionParentId]: AddActionParentRenderer,
  [DisabledParentId]: DisabledParentRenderer,
  [HexedParentId]: HexedParentRenderer,
  [InspectedAllId]: InspectedAllRenderer,
  [InvertSpeedAllId]: InvertSpeedAllRenderer,
  [ProtectedParentId]: ProtectedParentRenderer,
  [StunnedParentId]: StunnedParentRenderer,
  [UpdateStatParentId]: UpdateStatParentRenderer,

  // Triggers
  [AttackDownAllOtherOnUnitEnterId]: AttackDownAllOtherOnUnitEnterRenderer,
  [CreateSandstormOnUnitEnterId]: CreateSandstormOnUnitEnterRenderer,
  [DamageAllOnTurnEndId]: DamageAllOnTurnEndRenderer,
  [DamageNewUnitsOnUnitEnterId]: DamageNewUnitsOnUnitEnterRenderer,
  [DamageParentOnTurnEndId]: DamageParentOnTurnEndRenderer,
  [HealParentOnTurnEndId]: HealParentOnTurnEndRenderer,
  [HealParentOnUnitSwitchId]: HealParentOnUnitSwitchRenderer,
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
