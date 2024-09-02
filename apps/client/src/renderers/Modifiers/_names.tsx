import {
  AttackDownAllOtherOnUnitEnterId,
  AttackDownParentId,
  AttackUpParentId,
  CreateSandstormOnUnitEnterId,
  DamageAllOnTurnEndId,
  DamageNewUnitsOnUnitEnterId,
  DamageParentOnTurnEndId,
  DefenseDownParentId,
  FireDamageUpParentId,
  FireNegationUpParentId,
  HealParentOnUnitSwitchId,
  InspectAllOnUnitEnterId,
  InspectedAllId,
  InvertSpeedAllId,
  ProtectedParentId,
  SandstormOnTurnEndId,
  SpeedUpTeamId,
  StunnedParentId,
} from '@repo/game/data'

export const MODIFIER_NAMES: Record<string, string> = {
  [DamageAllOnTurnEndId]: 'Damage All on Turn End',
  [DamageNewUnitsOnUnitEnterId]: 'Spikes',
  [DamageParentOnTurnEndId]: 'Damage on Turn End',
  [DefenseDownParentId]: 'Defense Down',
  [ProtectedParentId]: 'Protected',

  [InspectedAllId]: 'Inspected',
  [FireDamageUpParentId]: 'Fire Damage Up',
  [FireNegationUpParentId]: 'Fire Damage Negation Up',
  [StunnedParentId]: 'Stun',
  [InvertSpeedAllId]: 'Invert Speed',
  [AttackDownParentId]: 'Attack Down',
  [AttackUpParentId]: 'Attack Up',

  [SpeedUpTeamId]: 'Speed Up',
  [CreateSandstormOnUnitEnterId]: 'Sand Stream',

  [HealParentOnUnitSwitchId]: 'Regenerate',
  [InspectAllOnUnitEnterId]: 'Scholar',
  [AttackDownAllOtherOnUnitEnterId]: 'Intimidate',
  [SandstormOnTurnEndId]: 'Sandstorm',
}
