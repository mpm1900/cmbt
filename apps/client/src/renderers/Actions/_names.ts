import {
  ACallBeyondId,
  ArmorUpId,
  BaneId,
  BiteId,
  BlessId,
  BodySlamId,
  ChillingGraspId,
  DeathRitesId,
  DispelMagicId,
  DragonBreathId,
  DragonStanceId,
  EarthquakeId,
  ElixirOfPowerId,
  ExplosionId,
  FireballId,
  FirePunchId,
  FirestormId,
  GhostFlameId,
  GuidingRayId,
  HideId,
  HoldPersonId,
  HyperBeamId,
  InfernalBlastId,
  InspectAllId,
  IntoxicateId,
  LightningBoltId,
  MagicMissileId,
  MemoryLeakId,
  MindBlastId,
  MindShatterId,
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
  SearingLightId,
  SetIsActiveId,
  SlashId,
  SneakAttackId,
  SpikesId,
  SwitchUnitId,
  SwordsDanceId,
  TauntId,
  TimeBendId,
  TrickRoomId,
  VampiricTouchId,
  WardId,
  WildStrikesId,
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
  [WildStrikesId]: 'Wild Strikes',
  [HoldPersonId]: 'Hold Creature',
  [HyperBeamId]: 'Hyper Beam',
  [MagicMissileId]: 'Magic Missile',
  [MemoryLeakId]: 'Memory Leak',
  [PoisonSprayId]: 'Poison Spray',
  [PowerWordKillId]: 'Power Word Kill',
  [ProtectId]: 'Protect',
  [QuickAttackId]: 'Rapid Strike',
  [RestId]: 'Rest',
  [SlashId]: 'Slash',
  [SpikesId]: 'Spikes',
  [SwordsDanceId]: 'Swords Dance',
  [TrickRoomId]: 'Trick Room',
  [WardId]: 'Ward',

  [PotionActionId]: 'Potion',

  [ACallBeyondId]: 'A Call Beyond',
  [ArmorUpId]: 'Armor Up',
  [BaneId]: 'Bane',
  [BiteId]: 'Bite',
  [BlessId]: 'Bless',
  [BodySlamId]: 'Body Slam',
  [ChillingGraspId]: 'Chilling Grasp',
  [DeathRitesId]: 'Death Rites',
  [DispelMagicId]: 'Dispel Magic',
  [DragonBreathId]: 'Dragon Breath',
  [DragonStanceId]: 'Dragon Stance',
  [ElixirOfPowerId]: 'Elixir of Power',
  [FirestormId]: 'Firestorm',
  [GhostFlameId]: 'Ghost Flame',
  [GuidingRayId]: 'Guiding Ray',
  [HideId]: 'Hide',
  [InfernalBlastId]: 'Infernal Blast',
  [IntoxicateId]: 'Intoxicate',
  [LightningBoltId]: 'Lightning Bolt',
  [MindBlastId]: 'Mind Blast',
  [MindShatterId]: 'Mind Shatter',
  [MindTwistId]: 'Mind Twist',
  [NegateArmorId]: 'Negate Armor',
  [PowerCleaveId]: 'Power Cleave',
  [PowerStanceId]: 'Power Stance',
  [PowerSwapId]: 'Power Swap',
  [PyroclashId]: 'Pyroclash',
  [RetreatingBlowId]: 'Retreating Blow',
  [SearingLightId]: 'Searing Light',
  [SneakAttackId]: 'Sneak Attack',
  [TauntId]: 'Taunt',
  [TimeBendId]: 'Time Bend',
  [VampiricTouchId]: 'Vampiric Touch',
}
