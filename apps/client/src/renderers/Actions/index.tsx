import { LogUnit } from '@/components/ui/log'
import {
  ACallBeyondId,
  ArmorUpId,
  AttackStageUpParentId,
  BaneId,
  BiteId,
  BlessId,
  BodySlamId,
  Burn,
  ChillingGraspId,
  DamageNewUnitsOnUnitEnter,
  DeathRitesId,
  DisabledParent,
  DispelMagicId,
  DragonBreathId,
  DragonStanceId,
  EarthquakeId,
  ElixirOfPowerId,
  ExplosionId,
  Fireball,
  FireballId,
  FirePunch,
  FirePunchId,
  FirestormId,
  GhostFlameId,
  GuidingRayId,
  HideId,
  HoldPerson,
  HoldPersonId,
  HyperBeam,
  HyperBeamId,
  InfernalBlastId,
  InspectAllId,
  InspectedAll,
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
  PiercingStrikeId,
  Poison,
  PoisonSprayId,
  PotionActionId,
  PowerCleaveId,
  PowerStanceId,
  PowerSwapId,
  PowerWordKillId,
  Protect,
  ProtectedParentId,
  ProtectId,
  PyroclashId,
  QuickAttack,
  QuickAttackId,
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
  TauntId,
  TimeBendId,
  TrickRoomId,
  UpdateFlagParent,
  UpdateStatStageParent,
  VampiricTouchId,
  Ward,
  WardId,
  WildStrikes,
  WildStrikesId,
} from '@repo/game/data'
import { Action, ActionResult, CombatContext, Unit } from '@repo/game/types'
import { DamageInline } from '@shared/DamageInline'
import { DamageListInline } from '@shared/DamageListInline'
import { MagicArmor } from '@shared/MagicArmor'
import { ModifierInline } from '@shared/ModifierInline'
import { StatusInline } from '@shared/StatusInline'
import { TextList } from '@shared/TextList'
import { ReactNode } from 'react'
import { ACTION_NAMES } from './_names'
import { ACallBeyondRenderer } from './ACallBeyond'
import { ArmorUpRenderer } from './ArmorUp'
import { BaneRenderer } from './Bane'
import { BiteRenderer } from './Bite'
import { BlessRenderer } from './Bless'
import { BodySlamRenderer } from './BodySlam'
import { ChillingGraspRenderer } from './ChillingGrasp'
import { DeathRitesRenderer } from './DeathRites'
import { DispelMagicRenderer } from './DispelMagic'
import { DragonBreathRenderer } from './DragonBreath'
import { DragonStanceRenderer } from './DragonStance'
import { ElixirOfPowerRenderer } from './ElixirOfPower'
import { FirestormRenderer } from './Firestorm'
import { GhostFlameRenderer } from './GhostFlame'
import { GuidingrayRenderer } from './GuidingRay'
import { HideRenderer } from './Hide'
import { InfernalBlastRenderer } from './InfernalBlast'
import { IntoxicateRenderer } from './Intoxicate'
import { LightningBoltRenderer } from './LightningBolt'
import { MindBlastRenderer } from './MindBlast'
import { MindShatterRenderer } from './MindShatter'
import { MindTwistRenderer } from './MindTwist'
import { NegateArmorRenderer } from './NegateArmor'
import { PiercingStrikeRenderer } from './PiercingStrike'
import { PowerCleaveRenderer } from './PowerCleave'
import { PowerStanceRenderer } from './PowerStance'
import { PowerSwapRenderer } from './PowerSwap'
import { PyroclashRenderer } from './Pyroclash'
import { RetreatingBlowRenderer } from './RetreatingBlow'
import { SearingLightRenderer } from './SearingLight'
import { SmiteRenderer } from './Smite'
import { SneakAttackRenderer } from './SneakAttack'
import { SongOfRuinRenderer } from './SongOfRuin'
import { TauntRenderer } from './Taunt'
import { TimeBendRenderer } from './TimeBend'
import { VampiricTouchRenderer } from './VampiricTouch'

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
  [ArmorUpId]: ArmorUpRenderer,
  [BaneId]: BaneRenderer,
  [BiteId]: BiteRenderer,
  [BlessId]: BlessRenderer,
  [BodySlamId]: BodySlamRenderer,
  [ChillingGraspId]: ChillingGraspRenderer,
  [DeathRitesId]: DeathRitesRenderer,
  [DispelMagicId]: DispelMagicRenderer,
  [DragonBreathId]: DragonBreathRenderer,
  [DragonStanceId]: DragonStanceRenderer,
  [ElixirOfPowerId]: ElixirOfPowerRenderer,
  [FirestormId]: FirestormRenderer,
  [GhostFlameId]: GhostFlameRenderer,
  [GuidingRayId]: GuidingrayRenderer,
  [HideId]: HideRenderer,
  [InfernalBlastId]: InfernalBlastRenderer,
  [IntoxicateId]: IntoxicateRenderer,
  [LightningBoltId]: LightningBoltRenderer,
  [MindBlastId]: MindBlastRenderer,
  [MindShatterId]: MindShatterRenderer,
  [MindTwistId]: MindTwistRenderer,
  [NegateArmorId]: NegateArmorRenderer,
  [PiercingStrikeId]: PiercingStrikeRenderer,
  [PowerCleaveId]: PowerCleaveRenderer,
  [PowerStanceId]: PowerStanceRenderer,
  [PowerSwapId]: PowerSwapRenderer,
  [PyroclashId]: PyroclashRenderer,
  [RetreatingBlowId]: RetreatingBlowRenderer,
  [SearingLightId]: SearingLightRenderer,
  [SmiteId]: SmiteRenderer,
  [SneakAttackId]: SneakAttackRenderer,
  [SongOfRuinId]: SongOfRuinRenderer,
  [TauntId]: TauntRenderer,
  [TimeBendId]: TimeBendRenderer,
  [VampiricTouchId]: VampiricTouchRenderer,

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
        <ModifierInline modifier={new InspectedAll({})} side={props?.side} /> to
        all enemy units.
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
          to target enemy unit for {disable.duration} turns.
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
  [ExplosionId]: {
    name: 'Explosion',
    description: (action) => (
      <>
        Deals damage equal to 4 times this unit's physical stat to all other
        units. This unit's health becomes zero.
      </>
    ),
  },

  [FireballId]: {
    name: ACTION_NAMES[FireballId],
    description: (action) => {
      const fireball = action as Fireball
      return (
        <>
          Deals <DamageListInline damages={action.damages} /> to target enemy
          unit. Deals <DamageInline damage={fireball.splashDamage} /> to all
          other active enemy units.
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
          Deals <DamageListInline damages={action.damages} /> to target enemy
          unit. {firepunch.burnChance}% chance to apply{' '}
          <StatusInline status={Burn} side={props?.side} />.
        </div>
      )
    },
  },
  [WildStrikesId]: {
    name: ACTION_NAMES[WildStrikesId],
    description: (action) => {
      const furySwipes = action as WildStrikes
      return (
        <div>
          Deals <DamageListInline damages={action.damages} /> to target enemy
          unit. Repeats 2-6 times.
        </div>
      )
    },
  },
  [HoldPersonId]: {
    name: ACTION_NAMES[HoldPersonId],
    description: (action, props) => {
      const holdperson = action as HoldPerson
      return (
        <div>
          Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateFlagParent({
                registryId: StunnedParentId,
                flagKey: 'isStunned',
                value: true,
              })
            }
          />{' '}
          to target enemy unit for 1-3 turns.
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
          this unit's base magic stat to target enemy unit. Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateFlagParent({
                registryId: StunnedParentId,
                flagKey: 'isStunned',
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
        Deals <DamageListInline damages={action.damages} /> to 2 target enemy
        units. This action cannot miss.
      </>
    ),
  },
  [QuickAttackId]: {
    name: ACTION_NAMES[QuickAttackId],
    description: (action) => {
      const quickAttack = action as QuickAttack
      return (
        <>
          Deals <DamageListInline damages={action.damages} /> to target enemy
          unit. Usually goes first.
        </>
      )
    },
  },
  [PoisonSprayId]: {
    name: ACTION_NAMES[PoisonSprayId],
    description: (action, props) => {
      const poisionSpray = action as QuickAttack
      return (
        <>
          Deals <DamageListInline damages={action.damages} /> to target enemy
          unit and applies <StatusInline side={props?.side} status={Poison} />.
        </>
      )
    },
  },
  [PowerWordKillId]: {
    name: ACTION_NAMES[PowerWordKillId],
    description: (action) => (
      <>
        Deals <DamageListInline damages={action.damages} /> to target enemy
        unit. Ignores all damage negation.
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
                flagKey: 'isProtected',
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
                flagKey: 'isStunned',
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
          Deals <DamageListInline damages={action.damages} /> to target enemy
          unit. High critical chance.
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
                  raw: spikes.enterDamage,
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
    name: 'Trick Room',
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
