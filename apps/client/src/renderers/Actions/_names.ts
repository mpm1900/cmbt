import {
  ArmorUpId,
  BodySlamId,
  CrunchId,
  DisableId,
  EarthquakeId,
  ExplosionId,
  FireballId,
  FireBlastId,
  FirePunchId,
  FurySwipesId,
  HyperBeamId,
  IcyWindId,
  InspectAllId,
  MagicMissileId,
  PotionActionId,
  PowerWordKillId,
  ProtectId,
  QuickAttackId,
  RestId,
  SandstormId,
  SetIsActiveId,
  SpikesId,
  SwitchUnitId,
  SwordsDanceId,
  TrickRoomId,
  WillOWispId,
} from '@repo/game/data'

export const ACTION_NAMES: Record<string, string> = {
  [SetIsActiveId]: 'Set IsActive',
  [SwitchUnitId]: 'Switch Units',
  [InspectAllId]: 'Inspect',

  [ArmorUpId]: 'Armor Up',
  [BodySlamId]: 'Body Slam',
  [CrunchId]: 'Crunch',
  [DisableId]: 'Disable',
  [EarthquakeId]: 'Earthquake',
  [ExplosionId]: 'Explosion',
  [FireballId]: 'Fireball',
  [FireBlastId]: 'Fire Blast',
  [FirePunchId]: 'Fire Punch',
  [FurySwipesId]: 'Fury Swipes',
  [HyperBeamId]: 'Hyper Beam',
  [IcyWindId]: 'Icy Wind',
  [MagicMissileId]: 'Magic Missile',
  [PowerWordKillId]: 'Power Word Kill',
  [ProtectId]: 'Protect',
  [QuickAttackId]: 'Quick Attack',
  [RestId]: 'Rest',
  [SandstormId]: 'Sandstorm',
  [SpikesId]: 'Spikes',
  [SwordsDanceId]: 'Swords Dance',
  [TrickRoomId]: 'Trick Room',
  [WillOWispId]: 'Will-o-wisp',

  [PotionActionId]: 'Potion',
}
