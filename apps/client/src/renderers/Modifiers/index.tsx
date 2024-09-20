import {
  AddActionParentId,
  AddModifiersOnSelfEnterId,
  AddModifiersPerUnitOnSelfEnterId,
  AddModifiersToRegistryAllId,
  AddModifiersToRegistryTeamId,
  AddStatModifiersImmunityAllId,
  BanedParentId,
  BlessedParentId,
  DamageAllOnTurnEndId,
  DamageNewUnitsOnUnitEnterId,
  DamageParentOnTurnEndId,
  DamageSourceOnSelfTakeDamageId,
  DisabledParentId,
  DrainLifeParentOnTurnEndId,
  EnragedParentId,
  HealingPrayerId,
  HealParentOnTurnEndId,
  HealParentOnUnitSwitchId,
  HiddenParentId,
  InspectedAllId,
  IntangibleParentId,
  InvertSpeedAllId,
  KillParentOnTurnEndId,
  ProtectedParentId,
  SleepingParentId,
  StunnedParentId,
  UpdateStatAllId,
  UpdateStatParentId,
  UpdateStatStageParentId,
  UpdateStatTeamId,
} from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { ReactNode } from 'react'
import { AddActionParentRenderer } from './AddActionParent'
import { AddModifiersToRegistryAllRenderer } from './AddModifiersToRegistryAll'
import { AddStatModifiersImmunityAllRenderer } from './AddStatModifiersImmunityAll'
import { BanedParentRenderer } from './BanedParent'
import { BlessedParentRenderer } from './BlessedParent'
import { DisabledParentRenderer } from './DisabledParent'
import { EnragedParentRenderer } from './EnragedParent'
import { HiddenParentRenderer } from './HiddenParent'
import { InspectedAllRenderer } from './InspectedAll'
import { IntangibleParentRenderer } from './IntangibleParent'
import { InvertSpeedAllRenderer } from './InvertSpeedAll'
import { ProtectedParentRenderer } from './ProtectedParent'
import { StunnedParentRenderer } from './StunnedParent'
import { AddModifiersOnSelfEnterRenderer } from './Triggers/AddModifiersOnSelfEnter'
import { DamageAllOnTurnEndRenderer } from './Triggers/DamageAllOnTurnEnd'
import { DamageNewUnitsOnUnitEnterRenderer } from './Triggers/DamageNewUnitsOnUnitEnter'
import { DamageParentOnTurnEndRenderer } from './Triggers/DamageParentOnTurnEnd'
import { DamageSourceOnSelfTakeDamageRenderer } from './Triggers/DamageSourceOnSelfTakeDamage'
import { DrainLifeParentOnTurnEndRenderer } from './Triggers/DrainLifeParentOnTurnEnd'
import { HealParentOnTurnEndRenderer } from './Triggers/HealParentOnTurnEnd'
import { HealParentOnUnitSwitchRenderer } from './Triggers/HealParentOnUnitSwitch'
import { KillParentOnTurnEndRenderer } from './Triggers/KillParentOnTurnEnd'
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
  // Modifiers
  [AddActionParentId]: AddActionParentRenderer,
  [AddModifiersToRegistryAllId]: AddModifiersToRegistryAllRenderer,
  [AddModifiersToRegistryTeamId]: AddModifiersToRegistryAllRenderer,
  [InvertSpeedAllId]: InvertSpeedAllRenderer,
  [UpdateStatAllId]: UpdateStatAllRenderer,
  [UpdateStatParentId]: UpdateStatParentRenderer,
  [UpdateStatStageParentId]: UpdateStatStageParentRenderer,
  [UpdateStatTeamId]: UpdateStatTeamRenderer,

  // Triggers
  [AddModifiersOnSelfEnterId]: AddModifiersOnSelfEnterRenderer,
  [AddModifiersPerUnitOnSelfEnterId]: AddModifiersOnSelfEnterRenderer,
  [DamageAllOnTurnEndId]: DamageAllOnTurnEndRenderer,
  [DamageNewUnitsOnUnitEnterId]: DamageNewUnitsOnUnitEnterRenderer,
  [DamageParentOnTurnEndId]: DamageParentOnTurnEndRenderer,
  [DamageSourceOnSelfTakeDamageId]: DamageSourceOnSelfTakeDamageRenderer,
  [DrainLifeParentOnTurnEndId]: DrainLifeParentOnTurnEndRenderer,
  [HealParentOnTurnEndId]: HealParentOnTurnEndRenderer,
  [HealParentOnUnitSwitchId]: HealParentOnUnitSwitchRenderer,
  [IntangibleParentId]: IntangibleParentRenderer,
  [KillParentOnTurnEndId]: KillParentOnTurnEndRenderer,

  // Override Modifiers
  [AddStatModifiersImmunityAllId]: AddStatModifiersImmunityAllRenderer, // Dispel Magic
  [BanedParentId]: BanedParentRenderer,
  [BlessedParentId]: BlessedParentRenderer,
  [DisabledParentId]: DisabledParentRenderer,
  [EnragedParentId]: EnragedParentRenderer,
  [HiddenParentId]: HiddenParentRenderer,
  [InspectedAllId]: InspectedAllRenderer,
  [ProtectedParentId]: ProtectedParentRenderer,
  [StunnedParentId]: StunnedParentRenderer,
  [SleepingParentId]: StunnedParentRenderer,

  // Override Triggers
  [HealingPrayerId]: HealParentOnTurnEndRenderer,
}
