import {
  AddStatModifiersImmunityAllId,
  AttackDownAllOtherOnUnitEnterId,
  AttackDownParentId,
  AttackStageDownParentId,
  AttackStageUpParentId,
  AttackUpParentId,
  BleedDamageId,
  BurnDamageId,
  CreateSandstormOnUnitEnterId,
  DamageAllOnTurnEndId,
  DamageNewUnitsOnUnitEnterId,
  DamageParentOnTurnEndId,
  DefenseDownParentId,
  DefenseStageDownParentId,
  DefenseStageUpParentId,
  DefneseUpParentId,
  DisabledParentId,
  DivineHealingId,
  FireDamageUpParentId,
  FireNegationUpParentId,
  HealParentOnTurnEndId,
  HealParentOnUnitSwitchId,
  HexedParentId,
  HiddenParentId,
  InspectAllOnUnitEnterId,
  InspectedAllId,
  InvertSpeedAllId,
  MagicDownParentId,
  MagicStageDownParentId,
  MagicStageUpParentId,
  MagicUpParentId,
  PoisonedDamageOnTurnEndId,
  PowerStanceId,
  ProtectedParentId,
  SandstormOnTurnEndId,
  SpeedDownParentId,
  SpeedStageDownParentId,
  SpeedStageUpParentId,
  SpeedUpParentId,
  SpeedUpTeamId,
  StunnedParentId,
} from '@repo/game/data'

export const MODIFIER_NAMES: Record<string, string> = {
  [AttackDownAllOtherOnUnitEnterId]: 'Intimidate',
  [CreateSandstormOnUnitEnterId]: 'Sand Stream',
  [DamageAllOnTurnEndId]: 'Damage All on Turn End',
  [BleedDamageId]: 'Bleed Damage',
  [BurnDamageId]: 'Burn Damage',
  [DamageNewUnitsOnUnitEnterId]: 'Spikes',
  [DamageParentOnTurnEndId]: 'Damage on Turn End',
  [DivineHealingId]: 'Divine Healing',
  [HealParentOnTurnEndId]: 'Heal Parent On Turn End',
  [HealParentOnUnitSwitchId]: 'Regenerate',
  [InspectAllOnUnitEnterId]: 'Scholar',
  [PoisonedDamageOnTurnEndId]: 'Poisoned',
  [SandstormOnTurnEndId]: 'Sandstorm',

  [AddStatModifiersImmunityAllId]: 'Dispel Stat Changes',
  [AttackDownParentId]: 'Attack Down',
  [AttackStageDownParentId]: 'Attack Down',
  [AttackStageUpParentId]: 'Attack Up',
  [AttackUpParentId]: 'Attack Up',
  [DefenseDownParentId]: 'Defense Down',
  [DefenseStageDownParentId]: 'Defense Down',
  [DefenseStageUpParentId]: 'Defense Up',
  [DefneseUpParentId]: 'Defense Up',
  [DisabledParentId]: 'Disabled',
  [FireDamageUpParentId]: 'Fire Damage Up',
  [FireNegationUpParentId]: 'Fire Damage Negation Up',
  [HiddenParentId]: 'Hidden',
  [HexedParentId]: 'Hexed',
  [InspectedAllId]: 'Inspected',
  [InvertSpeedAllId]: 'Invert Speed',
  [MagicDownParentId]: 'Magic Down',
  [MagicStageDownParentId]: 'Magic Down',
  [MagicStageUpParentId]: 'Magic Up',
  [MagicUpParentId]: 'Magic Up',
  [PowerStanceId]: 'Power Stance',
  [ProtectedParentId]: 'Protected',
  [SpeedDownParentId]: 'Speed Down',
  [SpeedStageDownParentId]: 'Speed Down',
  [SpeedStageUpParentId]: 'Speed Up',
  [SpeedUpParentId]: 'Speed Up',
  [SpeedUpTeamId]: 'Speed Up',
  [StunnedParentId]: 'Stunned',
}
