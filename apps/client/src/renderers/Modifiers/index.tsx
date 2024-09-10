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
  HiddenParentId,
  InspectAllOnUnitEnterId,
  InspectedAll,
  InspectedAllId,
  InvertSpeedAllId,
  ProtectedParentId,
  StunnedParentId,
  UpdateStatParentId,
  UpdateStatStageParentId,
} from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { ReactNode } from 'react'
import { ModifierName, TriggerName } from './_helpers'
import { MODIFIER_NAMES } from './_names'
import { AddActionParentRenderer } from './AddActionParent'
import { DisabledParentRenderer } from './DisabledParent'
import { HexedParentRenderer } from './HexedParent'
import { HiddenParentRenderer } from './HiddenParent'
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
import { UpdateStatStageParentRenderer } from './UpdateStatStageParent'

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
  [HiddenParentId]: HiddenParentRenderer,
  [InspectedAllId]: InspectedAllRenderer,
  [InvertSpeedAllId]: InvertSpeedAllRenderer,
  [ProtectedParentId]: ProtectedParentRenderer,
  [StunnedParentId]: StunnedParentRenderer,
  [UpdateStatParentId]: UpdateStatParentRenderer,
  [UpdateStatStageParentId]: UpdateStatStageParentRenderer,

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
      <div>
        <TriggerName>On self enter:</TriggerName>
        <span>
          Applies <ModifierInline modifier={new InspectedAll({})} /> to all
          units.
        </span>
      </div>
    ),
  },
}
