import {
  AddActionParentId,
  AddStatModifiersImmunityAllId,
  BanedParentId,
  BlessedParentId,
  CreateFirestormOnUnitEnterId,
  DamageAllOnTurnEndId,
  DamageNewUnitsOnUnitEnterId,
  DamageParentOnTurnEndId,
  DisabledParentId,
  DrainLifeParentOnTurnEndId,
  HealParentOnTurnEndId,
  HealParentOnUnitSwitchId,
  HiddenParentId,
  InspectAllOnUnitEnterId,
  InspectedAllId,
  InvertSpeedAllId,
  KillParentOnTurnEndId,
  ProtectedParentId,
  SleepingParentId,
  StatDownStaticAllOnUnitEnterId,
  StatStageDownAllOtherOnUnitEnterId,
  StunnedParentId,
  UpdateStatAllId,
  UpdateStatParentId,
  UpdateStatStageParentId,
  UpdateStatTeamId,
} from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { ReactNode } from 'react'
import { AddActionParentRenderer } from './AddActionParent'
import { AddStatModifiersImmunityAllRenderer } from './AddStatModifiersImmunityAll'
import { BanedParentRenderer } from './BanedParent'
import { BlessedParentRenderer } from './BlessedParent'
import { DisabledParentRenderer } from './DisabledParent'
import { HiddenParentRenderer } from './HiddenParent'
import { InspectedAllRenderer } from './InspectedAll'
import { InvertSpeedAllRenderer } from './InvertSpeedAll'
import { ProtectedParentRenderer } from './ProtectedParent'
import { StunnedParentRenderer } from './StunnedParent'
import { CreateSandstormOnUnitEnterRenderer } from './Triggers/CreateFirestormOnUnitEnter'
import { DamageAllOnTurnEndRenderer } from './Triggers/DamageAllOnTurnEnd'
import { DamageNewUnitsOnUnitEnterRenderer } from './Triggers/DamageNewUnitsOnUnitEnter'
import { DamageParentOnTurnEndRenderer } from './Triggers/DamageParentOnTurnEnd'
import { DrainLifeParentOnTurnEndRenderer } from './Triggers/DrainLifeParentOnTurnEnd'
import { HealParentOnTurnEndRenderer } from './Triggers/HealParentOnTurnEnd'
import { HealParentOnUnitSwitchRenderer } from './Triggers/HealParentOnUnitSwitch'
import { InspectAllOnUnitEnterRenderer } from './Triggers/InspectAllOnUnitEnter'
import { KillParentOnTurnEndRenderer } from './Triggers/KillParentOnTurnEnd'
import { StatDownStaticAllOnUnitEnterRenderer } from './Triggers/StatDownStaticAllOnUnitEnterId'
import { StatStageDownAllOtherOnUnitEnterRenderer } from './Triggers/StatStageDownAllOtherOnUnitEnter'
import { UpdateStatAllRenderer } from './UpdateStatAll'
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
  [BanedParentId]: BanedParentRenderer,
  [HiddenParentId]: HiddenParentRenderer,
  [InspectedAllId]: InspectedAllRenderer,
  [InvertSpeedAllId]: InvertSpeedAllRenderer,
  [ProtectedParentId]: ProtectedParentRenderer,
  [StunnedParentId]: StunnedParentRenderer,
  [SleepingParentId]: StunnedParentRenderer,
  [UpdateStatAllId]: UpdateStatAllRenderer,
  [UpdateStatParentId]: UpdateStatParentRenderer,
  [UpdateStatStageParentId]: UpdateStatStageParentRenderer,
  [UpdateStatTeamId]: UpdateStatTeamRenderer,

  // Triggers

  [CreateFirestormOnUnitEnterId]: CreateSandstormOnUnitEnterRenderer,
  [DamageAllOnTurnEndId]: DamageAllOnTurnEndRenderer,
  [DamageNewUnitsOnUnitEnterId]: DamageNewUnitsOnUnitEnterRenderer,
  [DamageParentOnTurnEndId]: DamageParentOnTurnEndRenderer,
  [DrainLifeParentOnTurnEndId]: DrainLifeParentOnTurnEndRenderer,
  [HealParentOnTurnEndId]: HealParentOnTurnEndRenderer,
  [HealParentOnUnitSwitchId]: HealParentOnUnitSwitchRenderer,
  [InspectAllOnUnitEnterId]: InspectAllOnUnitEnterRenderer,
  [KillParentOnTurnEndId]: KillParentOnTurnEndRenderer,
  [StatDownStaticAllOnUnitEnterId]: StatDownStaticAllOnUnitEnterRenderer,
  [StatStageDownAllOtherOnUnitEnterId]:
    StatStageDownAllOtherOnUnitEnterRenderer,
}
