import {
  BurnDamageOnTurnEndId,
  BurnedPowerDownId,
  CreateSandstormOnUnitEnterId,
  DamageNewUnitsOnUnitEnterId,
  DefenseDownParentId,
  DefenseUpAllId,
  InvertSpeedAllId,
  PhysicalAttackDownParentId,
  PhysicalAttackUpParentId,
  PowerDownAllOtherOnUnitEnterId,
  SandstormOnTurnEndId,
  SetIsInspectedAllId,
  SetIsProtectedParentId,
  SetIsStunnedParentId,
} from '@repo/game/data'

export const MODIFIER_NAMES: Record<string, string> = {
  [SetIsInspectedAllId]: 'Inspected',
  [BurnDamageOnTurnEndId]: 'Burn:Damage',
  [BurnedPowerDownId]: 'Burn:Power-Down',
  [DefenseDownParentId]: 'Defense Down',
  [DefenseUpAllId]: 'Defense Buff',
  [SetIsStunnedParentId]: 'Stun',
  [InvertSpeedAllId]: 'Invert Speed',
  [PhysicalAttackDownParentId]: 'Physical Attack Down',
  [PhysicalAttackUpParentId]: 'Physical Attack Up',
  [SetIsProtectedParentId]: 'Protected',

  [CreateSandstormOnUnitEnterId]: 'Sand Stream',
  [SandstormOnTurnEndId]: 'Sandstorm',
  [DamageNewUnitsOnUnitEnterId]: 'Spikes',
  [PowerDownAllOtherOnUnitEnterId]: 'Intimidate',
}
