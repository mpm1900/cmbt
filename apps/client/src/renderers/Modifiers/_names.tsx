import {
  AddStatModifiersImmunityAllId,
  AttackDownAllOtherOnUnitEnterId,
  AttackDownParentId,
  AttackStageDownParentId,
  AttackStageUpParentId,
  AttackUpParentId,
  BleedDamageId,
  BlessedParentId,
  BurnDamageId,
  CreateFirestormOnUnitEnterId,
  DamageAllOnTurnEndId,
  DamageNewUnitsOnUnitEnterId,
  DamageParentOnTurnEndId,
  DefenseDownParentId,
  DefenseStageDownParentId,
  DefenseStageUpParentId,
  DefneseUpParentId,
  DisabledParentId,
  DisruptedParentId,
  DivineHealingId,
  DrainLifeParentOnTurnEndId,
  FireDamageUpParentId,
  FireNegationUpParentId,
  FirestormOnTurnEndId,
  HealParentOnTurnEndId,
  HealParentOnUnitSwitchId,
  HiddenParentId,
  InspectAllOnUnitEnterId,
  InspectedAllId,
  InvertSpeedAllId,
  KillParentOnTurnEndId,
  MagicDownParentId,
  MagicExpansionUpParentId,
  MagicStageDownParentId,
  MagicStageUpParentId,
  MagicUpParentId,
  MaxAttackParentId,
  PoisonedDamageOnTurnEndId,
  PowerStanceId,
  ProtectedParentId,
  SpeedDownParentId,
  SpeedStageDownParentId,
  SpeedStageUpParentId,
  SpeedUpParentId,
  SpeedUpTeamId,
  StunnedParentId,
} from '@repo/game/data'

export const MODIFIER_NAMES: Record<string, string> = {
  [AttackDownAllOtherOnUnitEnterId]: 'Draconic Aura',
  [CreateFirestormOnUnitEnterId]: 'Inferno',
  [DamageAllOnTurnEndId]: 'Damage All on Turn End',
  [BleedDamageId]: 'Bleed Damage',
  [BurnDamageId]: 'Burn Damage',
  [DamageNewUnitsOnUnitEnterId]: 'Spikes',
  [DamageParentOnTurnEndId]: 'Damage on Turn End',
  [DrainLifeParentOnTurnEndId]: 'Drain Life',
  [DivineHealingId]: 'Divine Healing',
  [HealParentOnTurnEndId]: 'Heal Parent On Turn End',
  [HealParentOnUnitSwitchId]: 'Regenerate',
  [InspectAllOnUnitEnterId]: 'Scholar',
  [PoisonedDamageOnTurnEndId]: 'Poisoned',
  [FirestormOnTurnEndId]: 'Firestorm',
  [KillParentOnTurnEndId]: 'Destined Death',

  [AddStatModifiersImmunityAllId]: 'Dispel Stat Changes',
  [AttackDownParentId]: 'Attack Down',
  [AttackStageDownParentId]: 'Attack Down',
  [AttackStageUpParentId]: 'Attack Up',
  [AttackUpParentId]: 'Attack Up',
  [BlessedParentId]: 'Blessed',
  [DefenseDownParentId]: 'Defense Down',
  [DefenseStageDownParentId]: 'Defense Down',
  [DefenseStageUpParentId]: 'Defense Up',
  [DefneseUpParentId]: 'Defense Up',
  [DisabledParentId]: 'Disabled',
  [FireDamageUpParentId]: 'Fire Damage Up',
  [FireNegationUpParentId]: 'Fire Damage Negation Up',
  [HiddenParentId]: 'Hidden',
  [DisruptedParentId]: 'Disrupted',
  [InspectedAllId]: 'Inspected',
  [InvertSpeedAllId]: 'Invert Speed',
  [MagicDownParentId]: 'Magic Down',
  [MagicStageDownParentId]: 'Magic Down',
  [MagicStageUpParentId]: 'Magic Up',
  [MagicUpParentId]: 'Magic Up',
  [MagicExpansionUpParentId]: 'Magic Damage Negation Up',
  [MaxAttackParentId]: 'Max Attack',
  [PowerStanceId]: 'Power Stance',
  [ProtectedParentId]: 'Protected',
  [SpeedDownParentId]: 'Speed Down',
  [SpeedStageDownParentId]: 'Speed Down',
  [SpeedStageUpParentId]: 'Speed Up',
  [SpeedUpParentId]: 'Speed Up',
  [SpeedUpTeamId]: 'Speed Up',
  [StunnedParentId]: 'Stunned',
}
