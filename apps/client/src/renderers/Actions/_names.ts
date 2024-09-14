import {
  ArmorUpId,
  BaneId,
  BiteId,
  BlessId,
  BodySlamId,
  DeathRitesId,
  DispelMagicId,
  DragonBreathId,
  DragonStanceId,
  EarthquakeId,
  ElixirOfPowerId,
  ExplosionId,
  FireballId,
  FirePunchId,
  FurySwipesId,
  GhostFlameId,
  HoldPersonId,
  HyperBeamId,
  InfernalBlastId,
  InspectAllId,
  IntoxicateId,
  LightningBoltId,
  MagicMissileId,
  MemoryLeakId,
  MindBlastId,
  MindTwistId,
  NegateArmorId,
  PiercingStrikeId,
  PoisonSprayId,
  PotionActionId,
  PowerCleaveId,
  PowerStanceId,
  PowerSwapId,
  PowerWordKillId,
  ProtectId,
  PyroclashId,
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
  TimeBendId,
  TrickRoomId,
  WardId,
} from '@repo/game/data'

export const ACTION_NAMES: Record<string, string> = {
  [SetIsActiveId]: 'Set IsActive',
  [SwitchUnitId]: 'Switch Units',
  [InspectAllId]: 'Inspect',

  [PiercingStrikeId]: 'Piercing Strike',
  [EarthquakeId]: 'Earthquake',
  [ExplosionId]: 'Explosion',
  [FireballId]: 'Fireball',
  [FirePunchId]: 'Fire Punch',
  [FurySwipesId]: 'Fury Swipes',
  [HoldPersonId]: 'Hold Person',
  [HyperBeamId]: 'Hyper Beam',
  [MagicMissileId]: 'Magic Missile',
  [MemoryLeakId]: 'Memory Leak',
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

  [PotionActionId]: 'Potion',

  [ArmorUpId]: 'Armor Up',
  [BaneId]: 'Bane',
  [BiteId]: 'Bite',
  [BlessId]: 'Bless',
  [BodySlamId]: 'Body Slam',
  [DeathRitesId]: 'Death Rites',
  [DispelMagicId]: 'Dispel Magic',
  [DragonBreathId]: 'Dragon Breath',
  [DragonStanceId]: 'Dragon Stance',
  [ElixirOfPowerId]: 'Elixir of Power',
  [GhostFlameId]: 'Ghost Flame',
  [InfernalBlastId]: 'Internal Blast',
  [IntoxicateId]: 'Intoxicate',
  [LightningBoltId]: 'Lightning Bolt',
  [MindBlastId]: 'Mind Blast',
  [MindTwistId]: 'Mind Twist',
  [NegateArmorId]: 'Negate Armor',
  [PowerCleaveId]: 'Power Cleave',
  [PowerStanceId]: 'Power Stance',
  [PowerSwapId]: 'Power Swap',
  [PyroclashId]: 'Pyroclash',
  [RetreatingBlowId]: 'Retreating Blow',
  [TauntId]: 'Taunt',
  [TimeBendId]: 'Time Bend',
}
