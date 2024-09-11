import {
  ArmorUpId,
  BattleStanceId,
  BiteId,
  BodySlamId,
  DisableId,
  DispelMagicId,
  DragonStanceId,
  EarthquakeId,
  ExplosionId,
  FireballId,
  FireBlastId,
  FirePunchId,
  FurySwipesId,
  HexId,
  HoldPersonId,
  HyperBeamId,
  InspectAllId,
  MagicMissileId,
  MindShatterId,
  NegateArmorId,
  PiercingStrikeId,
  PoisonSprayId,
  PotionActionId,
  PowerCleaveId,
  PowerStanceId,
  PowerSwapId,
  PowerWordKillId,
  ProtectId,
  QuickAttackId,
  RestId,
  RetreatingBlowId,
  SandstormId,
  SetIsActiveId,
  SlashId,
  SpikesId,
  SwitchUnitId,
  SwordsDanceId,
  TauntId,
  ThunderboltId,
  TimeBendId,
  TrickRoomId,
  WardId,
  WillOWispId,
} from '@repo/game/data'

export const ACTION_NAMES: Record<string, string> = {
  [SetIsActiveId]: 'Set IsActive',
  [SwitchUnitId]: 'Switch Units',
  [InspectAllId]: 'Inspect',

  [ArmorUpId]: 'Armor Up',
  [BodySlamId]: 'Body Slam',
  [PiercingStrikeId]: 'Piercing Strike',
  [DisableId]: 'Disable',
  [EarthquakeId]: 'Earthquake',
  [ExplosionId]: 'Explosion',
  [FireballId]: 'Fireball',
  [FireBlastId]: 'Fire Blast',
  [FirePunchId]: 'Fire Punch',
  [FurySwipesId]: 'Fury Swipes',
  [HoldPersonId]: 'Hold Person',
  [HyperBeamId]: 'Hyper Beam',
  [MagicMissileId]: 'Magic Missile',
  [PoisonSprayId]: 'Poison Spray',
  [PowerWordKillId]: 'Power Word Kill',
  [ProtectId]: 'Protect',
  [QuickAttackId]: 'Quick Attack',
  [RestId]: 'Rest',
  [SandstormId]: 'Sandstorm',
  [SlashId]: 'Slash',
  [SpikesId]: 'Spikes',
  [SwordsDanceId]: 'Swords Dance',
  [TrickRoomId]: 'Trick Room',
  [WardId]: 'Ward',
  [WillOWispId]: 'Will-o-wisp',

  [PotionActionId]: 'Potion',

  [BattleStanceId]: 'Battle Stance',
  [BiteId]: 'Bite',
  [DispelMagicId]: 'Dispel Magic',
  [DragonStanceId]: 'Dragon Stance',
  [HexId]: 'Hex',
  [MindShatterId]: 'Mind Shatter',
  [NegateArmorId]: 'Negate Armor',
  [PowerCleaveId]: 'Power Cleave',
  [PowerStanceId]: 'Power Stance',
  [PowerSwapId]: 'Power Swap',
  [RetreatingBlowId]: 'Retreating Blow',
  [TauntId]: 'Taunt',
  [ThunderboltId]: 'Thunderbolt',
  [TimeBendId]: 'Time Bend',
}
