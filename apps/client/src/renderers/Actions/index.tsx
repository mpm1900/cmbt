import { LogUnit } from '@/components/ui/log'
import {
  ACallBeyondId,
  AttackStageUpParentId,
  BaneId,
  BecomeTheStormId,
  BiteId,
  BlessId,
  BlockId,
  BoastId,
  BodySlamId,
  Burn,
  CallLightningId,
  ChainLightningId,
  ChillingGraspId,
  DamageNewUnitsOnUnitEnter,
  DeathRitesId,
  DisabledParent,
  DispelMagicId,
  DragonBreathId,
  DragonStanceId,
  EarthquakeId,
  ElixirOfPowerId,
  Fireball,
  FireballId,
  FirePunch,
  FirePunchId,
  FirestormId,
  GhostFlameId,
  GuidingRayId,
  HealingPrayerId,
  HealingWordId,
  HealSelfId,
  HideId,
  HoldCreatureId,
  HyperBeam,
  HyperBeamId,
  InfernalBlastId,
  InspectAllId,
  IntoxicateId,
  InvertSpeedAll,
  LightningBoltId,
  MagicMissileId,
  MemoryLeak,
  MemoryLeakId,
  MindBlastId,
  MindShatterId,
  MindTwistId,
  NegateArmorId,
  PhantomSlashId,
  PhantomSlashStagedId,
  PiercingStrikeId,
  Poison,
  PoisonSprayId,
  PotionActionId,
  PowerCleaveId,
  PowerSinkId,
  PowerStanceId,
  PowerWordKillId,
  Protect,
  ProtectedParentId,
  ProtectId,
  ProvokeId,
  PsyStabId,
  PyroclashId,
  RapidStrike,
  RapidStrikeId,
  Rest,
  RestId,
  RetreatingBlowId,
  SearingLightId,
  SetIsActiveId,
  Slash,
  SlashId,
  SleepingParentId,
  SmiteId,
  SneakAttackId,
  SongOfRuinId,
  Spikes,
  SpikesId,
  StunnedParentId,
  SwitchUnitId,
  SwordsDance,
  SwordsDanceId,
  TimeBendId,
  TrickRoomId,
  UpdateFlagAll,
  UpdateFlagParent,
  UpdateStatStageParent,
  VampiricTouchId,
  Ward,
  WardId,
  WildStrikesId,
  WindWalkId,
} from '@repo/game/data'
import { Action, ActionResult, CombatContext, Unit } from '@repo/game/types'
import { DamageListInline } from '@shared/DamageListInline'
import { MagicArmor } from '@shared/MagicArmor'
import { ModifierInline } from '@shared/ModifierInline'
import { StatusInline } from '@shared/StatusInline'
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
import { DeathRitesRenderer } from './DeathRites'
import { DispelMagicRenderer } from './DispelMagic'
import { DragonBreathRenderer } from './DragonBreath'
import { DragonStanceRenderer } from './DragonStance'
import { ElixirOfPowerRenderer } from './ElixirOfPower'
import { FirestormRenderer } from './Firestorm'
import { GhostFlameRenderer } from './GhostFlame'
import { GuidingrayRenderer } from './GuidingRay'
import { HealingPrayerRenderer } from './HealingPrayer'
import { HealingWordRenderer } from './HealingWord'
import { HealSelfRenderer } from './HealSelf'
import { HideRenderer } from './Hide'
import { InfernalBlastRenderer } from './InfernalBlast'
import { IntoxicateRenderer } from './Intoxicate'
import { LightningBoltRenderer } from './LightningBolt'
import { MindBlastRenderer } from './MindBlast'
import { MindShatterRenderer } from './MindShatter'
import { MindTwistRenderer } from './MindTwist'
import { NegateArmorRenderer } from './NegateArmor'
import { PhantomSlashRender } from './PhantomSlash'
import { PiercingStrikeRenderer } from './PiercingStrike'
import { PowerCleaveRenderer } from './PowerCleave'
import { PowerSwapRenderer } from './PowerSink'
import { PowerStanceRenderer } from './PowerStance'
import { ProvokeRenderer } from './Provoke'
import { PsyStabRenderer } from './PsyStab'
import { PyroclashRenderer } from './Pyroclash'
import { RetreatingBlowRenderer } from './RetreatingBlow'
import { SearingLightRenderer } from './SearingLight'
import { SmiteRenderer } from './Smite'
import { SneakAttackRenderer } from './SneakAttack'
import { SongOfRuinRenderer } from './SongOfRuin'
import { TimeBendRenderer } from './TimeBend'
import { VampiricTouchRenderer } from './VampiricTouch'
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
  [DeathRitesId]: DeathRitesRenderer,
  [DispelMagicId]: DispelMagicRenderer,
  [DragonBreathId]: DragonBreathRenderer,
  [DragonStanceId]: DragonStanceRenderer,
  [ElixirOfPowerId]: ElixirOfPowerRenderer,
  [FirestormId]: FirestormRenderer,
  [GhostFlameId]: GhostFlameRenderer,
  [GuidingRayId]: GuidingrayRenderer,
  [HealingPrayerId]: HealingPrayerRenderer,
  [HealingWordId]: HealingWordRenderer,
  [HealSelfId]: HealSelfRenderer,
  [HideId]: HideRenderer,
  [InfernalBlastId]: InfernalBlastRenderer,
  [IntoxicateId]: IntoxicateRenderer,
  [LightningBoltId]: LightningBoltRenderer,
  [MindBlastId]: MindBlastRenderer,
  [MindShatterId]: MindShatterRenderer,
  [MindTwistId]: MindTwistRenderer,
  [NegateArmorId]: NegateArmorRenderer,
  [PhantomSlashId]: PhantomSlashRender,
  [PhantomSlashStagedId]: PhantomSlashRender,
  [PiercingStrikeId]: PiercingStrikeRenderer,
  [PowerCleaveId]: PowerCleaveRenderer,
  [PowerStanceId]: PowerStanceRenderer,
  [PowerSinkId]: PowerSwapRenderer,
  [ProvokeId]: ProvokeRenderer,
  [PsyStabId]: PsyStabRenderer,
  [PyroclashId]: PyroclashRenderer,
  [RetreatingBlowId]: RetreatingBlowRenderer,
  [SearingLightId]: SearingLightRenderer,
  [SmiteId]: SmiteRenderer,
  [SneakAttackId]: SneakAttackRenderer,
  [SongOfRuinId]: SongOfRuinRenderer,
  [BoastId]: TauntRenderer,
  [TimeBendId]: TimeBendRenderer,
  [VampiricTouchId]: VampiricTouchRenderer,
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
  [MemoryLeakId]: {
    name: ACTION_NAMES[MemoryLeakId],
    description: (action, props) => {
      const disable = action as MemoryLeak
      return (
        <div>
          Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new DisabledParent({
                duration: disable.duration,
              })
            }
          />{' '}
          to target active enemy.
        </div>
      )
    },
  },
  [EarthquakeId]: {
    name: ACTION_NAMES[EarthquakeId],
    description: (action) => (
      <>
        Deals <DamageListInline damages={action.damages} /> to all other units.
      </>
    ),
  },
  [FireballId]: {
    name: ACTION_NAMES[FireballId],
    description: (action) => {
      const fireball = action as Fireball
      return (
        <>
          Deals <DamageListInline damages={action.damages} /> to target active
          enemy. Deals <DamageListInline damages={[fireball.splashDamage]} /> to
          all other active enemies.
        </>
      )
    },
  },
  [FirePunchId]: {
    name: ACTION_NAMES[FirePunchId],
    description: (action, props) => {
      const firepunch = action as FirePunch
      return (
        <div>
          Deals <DamageListInline damages={action.damages} /> to target active
          enemy. {firepunch.burnChance}% chance to apply{' '}
          <StatusInline status={Burn} side={props?.side} />.
        </div>
      )
    },
  },
  [WildStrikesId]: {
    name: ACTION_NAMES[WildStrikesId],
    description: (action) => {
      return (
        <div>
          Deals <DamageListInline damages={action.damages} /> to target active
          enemy. Repeats 2-6 times.
        </div>
      )
    },
  },
  [HoldCreatureId]: {
    name: ACTION_NAMES[HoldCreatureId],
    description: (action, props) => {
      return (
        <div>
          Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateFlagParent({
                registryId: StunnedParentId,
                flag: 'isStunned',
                value: true,
              })
            }
          />{' '}
          to target active enemy for 1-3 turns.
        </div>
      )
    },
  },
  [HyperBeamId]: {
    name: ACTION_NAMES[HyperBeamId],
    cost: () => '30 FP',
    costAlt: <span className="text-blue-300">30 FP</span>,
    description: (action, props) => {
      const hyperbeam = action as HyperBeam
      return (
        <div>
          Deals <DamageListInline damages={action.damages} /> equal to twice
          this unit's base magic stat to target active enemy. Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateFlagParent({
                registryId: StunnedParentId,
                flag: 'isStunned',
                value: true,
                duration: hyperbeam.stunDuration,
              })
            }
          />{' '}
          to this unit.
        </div>
      )
    },
  },
  [MagicMissileId]: {
    name: 'Magic Missile',
    description: (action) => (
      <>
        Deals <DamageListInline damages={action.damages} /> to 2 target active
        enemies. This action cannot miss.
      </>
    ),
  },
  [RapidStrikeId]: {
    name: ACTION_NAMES[RapidStrikeId],
    description: (action) => {
      const quickAttack = action as RapidStrike
      return (
        <>
          Deals <DamageListInline damages={action.damages} /> to target active
          enemy. Usually goes first.
        </>
      )
    },
  },
  [PoisonSprayId]: {
    name: ACTION_NAMES[PoisonSprayId],
    description: (action, props) => {
      const poisionSpray = action as RapidStrike
      return (
        <>
          Deals <DamageListInline damages={action.damages} /> to target active
          enemy and applies <StatusInline side={props?.side} status={Poison} />.
        </>
      )
    },
  },
  [PowerWordKillId]: {
    name: ACTION_NAMES[PowerWordKillId],
    description: (action) => (
      <>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. Ignores all damage negation.
      </>
    ),
    lore: () => (
      <>"Some spells are just too powerful to be allowed." -Game Developer</>
    ),
  },
  [ProtectId]: {
    name: ACTION_NAMES[ProtectId],
    description: (action, props) => {
      const protect = action as Protect
      return (
        <div>
          Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateFlagParent({
                registryId: ProtectedParentId,
                flag: 'isProtected',
                value: true,
                duration: protect.duration,
              })
            }
          />{' '}
          to this unit. Cannot be used twice in a row.
        </div>
      )
    },
    failureLog: (result) => <>{ACTION_NAMES[ProtectId]} failed.</>,
  },
  [RestId]: {
    name: ACTION_NAMES[RestId],
    description: (action, props) => {
      const rest = action as Rest
      return (
        <div>
          Removes all damage from this unit. Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateFlagParent({
                registryId: SleepingParentId,
                flag: 'isStunned',
                value: true,
                duration: rest.duration,
              })
            }
          />{' '}
          to this unit.
        </div>
      )
    },
  },
  [SlashId]: {
    name: ACTION_NAMES[SlashId],
    description: (action, props) => {
      const slash = action as Slash
      return (
        <>
          Deals <DamageListInline damages={action.damages} /> to target active
          enemy. High critical chance.
        </>
      )
    },
  },
  [SpikesId]: {
    name: ACTION_NAMES[SpikesId],
    description: (action, props) => {
      const spikes = action as Spikes
      return (
        <div>
          Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new DamageNewUnitsOnUnitEnter({
                maxInstances: 3,
                damage: {
                  attackType: 'physical',
                  damageType: 'force',
                  factor: 1 / 8,
                },
              })
            }
          />{' '}
          to the battlefield.
        </div>
      )
    },
    successLog: () => (
      <span className="text-muted-foreground">
        Spikes were put onto the battle!
      </span>
    ),
  },
  [SwordsDanceId]: {
    name: 'Swords Dance',
    description: (action, props) => {
      const swordsDance = action as SwordsDance
      return (
        <div>
          Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateStatStageParent({
                registryId: AttackStageUpParentId,
                stat: 'attack',
                stages: swordsDance.offset,
              })
            }
          />{' '}
          to this unit.
        </div>
      )
    },
  },
  [TrickRoomId]: {
    name: ACTION_NAMES[TrickRoomId],
    description: (action, props) => (
      <>
        Applies{' '}
        <ModifierInline side={props?.side} modifier={new InvertSpeedAll({})} />{' '}
        to all units.
      </>
    ),
  },
  [WardId]: {
    name: ACTION_NAMES[WardId],
    description: (action) => {
      const ward = action as Ward
      return (
        <>
          This unit gains <MagicArmor>magic armor</MagicArmor> equal to{' '}
          {ward.factor * 100}% of their max mealth.
        </>
      )
    },
  },
  [PotionActionId]: {
    name: ACTION_NAMES[PotionActionId],
    description: () => 'Heals 30 damage on target unit.',
  },
}
