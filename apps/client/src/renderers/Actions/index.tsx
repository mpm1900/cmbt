import { LogUnit } from '@/components/ui/log'
import {
  ACallBeyondId,
  BaneId,
  BecomeTheStormId,
  BiteId,
  BlessId,
  BlockId,
  BoastId,
  BodySlamId,
  CallLightningId,
  ChainLightningId,
  ChillingGraspId,
  CleaveId,
  DeathRitesId,
  DispelMagicId,
  DragonBreathId,
  DragonStanceId,
  EarthquakeId,
  ElixirOfPowerId,
  FireballId,
  FirePunchId,
  FirestormId,
  GhostFlameId,
  GuidingRayId,
  HealingPrayerId,
  HealingWordId,
  HealSelfId,
  HideId,
  HoldCreatureId,
  InfernalBlastId,
  InspectAllId,
  IntoxicateId,
  LayOnHandsId,
  LightningBoltId,
  MagicMissileId,
  MemoryLeakId,
  MindBlastId,
  MindShatterId,
  MindTwistId,
  NegateArmorId,
  PhantomSlashId,
  PhantomSlashStagedId,
  PiercingStrikeId,
  PoisonSprayId,
  PotionActionId,
  PowerCleaveId,
  PowerSinkId,
  PowerStanceId,
  PowerWordKillId,
  ProtectId,
  ProvokeId,
  PsyStabId,
  PyroclashId,
  RapidStrikeId,
  RestId,
  RetreatingBlowId,
  SearingLightId,
  SetIsActiveId,
  SlashId,
  SmiteId,
  SneakAttackId,
  SongOfRuinId,
  SpikesId,
  SwitchUnitId,
  SwordsDanceId,
  TimeBendId,
  TrickRoomId,
  UpdateFlagAll,
  VampiricTouchId,
  WardId,
  WildStrikesId,
  WindWalkId,
} from '@repo/game/data'
import { Action, ActionResult, CombatContext, Unit } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'
import { TextList } from '@shared/TextList'
import { ReactNode } from 'react'
import { ACTION_NAMES } from './_names'
import { ACallBeyondRenderer } from './ACallBeyond'
import { BaneRenderer } from './Bane'
import { BecomeTheStormRenderer } from './BecomeTheStorm'
import { BiteRenderer } from './Bite'
import { BlessRenderer } from './Bless'
import { BlockRenderer } from './Block'
import { TauntRenderer } from './Boast'
import { BodySlamRenderer } from './BodySlam'
import { CallLightningRenderer } from './CallLightning'
import { ChainLightningRenderer } from './ChainLightning'
import { ChillingGraspRenderer } from './ChillingGrasp'
import { CleaveRenderer } from './Cleave'
import { DeathRitesRenderer } from './DeathRites'
import { DispelMagicRenderer } from './DispelMagic'
import { DragonBreathRenderer } from './DragonBreath'
import { DragonStanceRenderer } from './DragonStance'
import { EarthquakeRenderer } from './Earthquake'
import { ElixirOfPowerRenderer } from './ElixirOfPower'
import { FireballRenderer } from './Fireball'
import { FirePunchRenderer } from './FirePunch'
import { FirestormRenderer } from './Firestorm'
import { GhostFlameRenderer } from './GhostFlame'
import { GuidingrayRenderer } from './GuidingRay'
import { HealingPrayerRenderer } from './HealingPrayer'
import { HealingWordRenderer } from './HealingWord'
import { HealSelfRenderer } from './HealSelf'
import { HideRenderer } from './Hide'
import { HoldCreatureRenderer } from './HoldCreature'
import { InfernalBlastRenderer } from './InfernalBlast'
import { IntoxicateRenderer } from './Intoxicate'
import { LayOnHandsRenderer } from './LayOnHands'
import { LightningBoltRenderer } from './LightningBolt'
import { MagicMissileRenderer } from './MagicMissile'
import { MemoryLeakRenderer } from './MemoryLeak'
import { MindBlastRenderer } from './MindBlast'
import { MindShatterRenderer } from './MindShatter'
import { MindTwistRenderer } from './MindTwist'
import { NegateArmorRenderer } from './NegateArmor'
import { PhantomSlashRender, PhantomSlashStagedRenderer } from './PhantomSlash'
import { PiercingStrikeRenderer } from './PiercingStrike'
import { PoisonSprayRenderer } from './PoisonSpray'
import { PowerCleaveRenderer } from './PowerCleave'
import { PowerSwapRenderer } from './PowerSink'
import { PowerStanceRenderer } from './PowerStance'
import { PowerWordKillRenderer } from './PowerWordKill'
import { ProtectRenderer } from './Protect'
import { ProvokeRenderer } from './Provoke'
import { PsyStabRenderer } from './PsyStab'
import { PyroclashRenderer } from './Pyroclash'
import { RapidStrikeRenderer } from './RapidStrike'
import { RestRenderer } from './Rest'
import { RetreatingBlowRenderer } from './RetreatingBlow'
import { SearingLightRenderer } from './SearingLight'
import { SlashRenderer } from './Slash'
import { SmiteRenderer } from './Smite'
import { SneakAttackRenderer } from './SneakAttack'
import { SongOfRuinRenderer } from './SongOfRuin'
import { SpikesRenderer } from './Spikes'
import { SwordsDanceRenderer } from './SwordsDance'
import { TimeBendRenderer } from './TimeBend'
import { TrickRoomRenderer } from './TrickRoom'
import { VampiricTouchRenderer } from './VampiricTouch'
import { WardRenderer } from './Ward'
import { WildStrikesRenderer } from './WildStrikes'
import { WindWalkRenderer } from './WindWalk'

export * from './_names'

export type ActionRenderer = {
  name: string
  cost?: (action: Action) => string
  costAlt?: ReactNode
  description: (
    action: Action,
    props?: { side: 'top' | 'right' | 'bottom' | 'left' }
  ) => ReactNode
  help?: (action: Action) => ReactNode
  lore?: (action: Action) => ReactNode
  log?: (
    action: Action,
    source: Unit | undefined,
    targets: Unit[],
    ctx: CombatContext
  ) => ReactNode
  successLog?: (result: ActionResult) => ReactNode
  failureLog?: (result: ActionResult) => ReactNode
}

export const ActionRenderers: Record<string, ActionRenderer> = {
  [ACallBeyondId]: ACallBeyondRenderer,
  [BaneId]: BaneRenderer,
  [BecomeTheStormId]: BecomeTheStormRenderer,
  [BiteId]: BiteRenderer,
  [BlessId]: BlessRenderer,
  [BlockId]: BlockRenderer,
  [BodySlamId]: BodySlamRenderer,
  [CallLightningId]: CallLightningRenderer,
  [ChainLightningId]: ChainLightningRenderer,
  [ChillingGraspId]: ChillingGraspRenderer,
  [CleaveId]: CleaveRenderer,
  [DeathRitesId]: DeathRitesRenderer,
  [DispelMagicId]: DispelMagicRenderer,
  [DragonBreathId]: DragonBreathRenderer,
  [DragonStanceId]: DragonStanceRenderer,
  [EarthquakeId]: EarthquakeRenderer,
  [ElixirOfPowerId]: ElixirOfPowerRenderer,
  [FireballId]: FireballRenderer,
  [FirePunchId]: FirePunchRenderer,
  [FirestormId]: FirestormRenderer,
  [GhostFlameId]: GhostFlameRenderer,
  [GuidingRayId]: GuidingrayRenderer,
  [HealingPrayerId]: HealingPrayerRenderer,
  [HealingWordId]: HealingWordRenderer,
  [HealSelfId]: HealSelfRenderer,
  [HideId]: HideRenderer,
  [HoldCreatureId]: HoldCreatureRenderer,
  [InfernalBlastId]: InfernalBlastRenderer,
  [IntoxicateId]: IntoxicateRenderer,
  [LayOnHandsId]: LayOnHandsRenderer,
  [LightningBoltId]: LightningBoltRenderer,
  [MagicMissileId]: MagicMissileRenderer,
  [MemoryLeakId]: MemoryLeakRenderer,
  [MindBlastId]: MindBlastRenderer,
  [MindShatterId]: MindShatterRenderer,
  [MindTwistId]: MindTwistRenderer,
  [NegateArmorId]: NegateArmorRenderer,
  [PhantomSlashId]: PhantomSlashRender,
  [PhantomSlashStagedId]: PhantomSlashStagedRenderer,
  [PiercingStrikeId]: PiercingStrikeRenderer,
  [PoisonSprayId]: PoisonSprayRenderer,
  [PowerCleaveId]: PowerCleaveRenderer,
  [PowerSinkId]: PowerSwapRenderer,
  [PowerStanceId]: PowerStanceRenderer,
  [PowerWordKillId]: PowerWordKillRenderer,
  [ProtectId]: ProtectRenderer,
  [ProvokeId]: ProvokeRenderer,
  [PsyStabId]: PsyStabRenderer,
  [PyroclashId]: PyroclashRenderer,
  [RapidStrikeId]: RapidStrikeRenderer,
  [RestId]: RestRenderer,
  [RetreatingBlowId]: RetreatingBlowRenderer,
  [SearingLightId]: SearingLightRenderer,
  [SlashId]: SlashRenderer,
  [SmiteId]: SmiteRenderer,
  [SneakAttackId]: SneakAttackRenderer,
  [SongOfRuinId]: SongOfRuinRenderer,
  [SpikesId]: SpikesRenderer,
  [SwordsDanceId]: SwordsDanceRenderer,
  [BoastId]: TauntRenderer,
  [TimeBendId]: TimeBendRenderer,
  [TrickRoomId]: TrickRoomRenderer,
  [VampiricTouchId]: VampiricTouchRenderer,
  [WardId]: WardRenderer,
  [WildStrikesId]: WildStrikesRenderer,
  [WindWalkId]: WindWalkRenderer,

  /// SYSTEM ACTIONS
  [SetIsActiveId]: {
    name: ACTION_NAMES[SetIsActiveId],
    description: () => <></>,
    log: (_, __, targets, ctx) => (
      <span className="text-muted-foreground">
        <TextList>
          {targets.map((target, i) => (
            <LogUnit key={target.id} unit={target} user={ctx.user}>
              {target.name}
            </LogUnit>
          ))}
        </TextList>{' '}
        joined the battle!
      </span>
    ),
  },
  [SwitchUnitId]: {
    name: ACTION_NAMES[SwitchUnitId],
    description: () => <></>,
    log: (_, source, [target], ctx) => (
      <span className="text-muted-foreground">
        <LogUnit unit={target} user={ctx.user}>
          {target.name}
        </LogUnit>{' '}
        is switched in for{' '}
        <LogUnit unit={source!} user={ctx.user}>
          {source?.name}
        </LogUnit>
      </span>
    ),
  },
  [InspectAllId]: {
    name: ACTION_NAMES[InspectAllId],
    description: (action, props) => (
      <>
        Applies{' '}
        <ModifierInline
          modifier={new UpdateFlagAll({ registryId: InspectAllId })}
          side={props?.side}
        />{' '}
        to all enemies.
      </>
    ),
  },

  /// OTHER ACTIONS
  [PotionActionId]: {
    name: ACTION_NAMES[PotionActionId],
    description: () => 'Heals 30 damage on target unit.',
  },
}
