import {
  AddActionParentId,
  AddStatModifiersImmunityAllId,
  AttackDownAllOtherOnUnitEnterId,
  BlessedParentId,
  CreateSandstormOnUnitEnterId,
  DamageAllOnTurnEndId,
  DamageNewUnitsOnUnitEnterId,
  DamageParentOnTurnEndId,
  DisabledParentId,
  DisruptedParentId,
  HealParentOnTurnEndId,
  HealParentOnUnitSwitchId,
  HiddenParentId,
  InspectAllOnUnitEnterId,
  InspectedAllId,
  InvertSpeedAllId,
  KillParentOnTurnEndId,
  ProtectedParentId,
  StunnedParentId,
  UpdateStatParentId,
  UpdateStatStageParentId,
  UpdateStatTeamId,
} from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { ReactNode } from 'react'
import { AddActionParentRenderer } from './AddActionParent'
import { AddStatModifiersImmunityAllRenderer } from './AddStatModifiersImmunityAll'
import { BlessedParentRenderer } from './BlessedParent'
import { DisabledParentRenderer } from './DisabledParent'
import { DisruptedParentRenderer } from './DisruptedParent'
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
import { InspectAllOnUnitEnterRenderer } from './Triggers/InspectAllOnUnitEnter'
import { KillParentOnTurnEndRenderer } from './Triggers/KillParentOnTurnEnd'
import { UpdateStatParentRenderer } from './UpdateStatParent'
import { UpdateStatStageParentRenderer } from './UpdateStatStageParent'
import { UpdateStatTeamRenderer } from './UpdateStatTeam'

export * from './_icons'
export * from './_names'

export type ModifierRenderer = {
  name: (modifier: Modifier) => ReactNode
  description?: (modifier: Modifier) => ReactNode
}

export const ModifierRenderers: Record<string, ModifierRenderer> = {
  [AddActionParentId]: AddActionParentRenderer,
  [AddStatModifiersImmunityAllId]: AddStatModifiersImmunityAllRenderer,
  [BlessedParentId]: BlessedParentRenderer,
  [DisabledParentId]: DisabledParentRenderer,
  [DisruptedParentId]: DisruptedParentRenderer,
  [HiddenParentId]: HiddenParentRenderer,
  [InspectedAllId]: InspectedAllRenderer,
  [InvertSpeedAllId]: InvertSpeedAllRenderer,
  [ProtectedParentId]: ProtectedParentRenderer,
  [StunnedParentId]: StunnedParentRenderer,
  [UpdateStatParentId]: UpdateStatParentRenderer,
  [UpdateStatStageParentId]: UpdateStatStageParentRenderer,
  [UpdateStatTeamId]: UpdateStatTeamRenderer,

  // Triggers
  [AttackDownAllOtherOnUnitEnterId]: AttackDownAllOtherOnUnitEnterRenderer,
  [CreateSandstormOnUnitEnterId]: CreateSandstormOnUnitEnterRenderer,
  [DamageAllOnTurnEndId]: DamageAllOnTurnEndRenderer,
  [DamageNewUnitsOnUnitEnterId]: DamageNewUnitsOnUnitEnterRenderer,
  [DamageParentOnTurnEndId]: DamageParentOnTurnEndRenderer,
  [HealParentOnTurnEndId]: HealParentOnTurnEndRenderer,
  [HealParentOnUnitSwitchId]: HealParentOnUnitSwitchRenderer,
  [InspectAllOnUnitEnterId]: InspectAllOnUnitEnterRenderer,
  [KillParentOnTurnEndId]: KillParentOnTurnEndRenderer,
}
