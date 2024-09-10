import { LogUnit } from '@/components/ui/log'
import {
  ArmorUpId,
  AttackStageUpParentId,
  BattleStanceId,
  BiteId,
  BodySlamId,
  Burn,
  DamageAllOnTurnEnd,
  DamageNewUnitsOnUnitEnter,
  Disable,
  DisabledParent,
  DisableId,
  DragonStanceId,
  EarthquakeId,
  ExplosionId,
  Fireball,
  FireballId,
  FireBlast,
  FireBlastId,
  FirePunch,
  FirePunchId,
  FurySwipes,
  FurySwipesId,
  HexId,
  HoldPerson,
  HoldPersonId,
  HyperBeam,
  HyperBeamId,
  IcyWindId,
  InspectAllId,
  InspectedAll,
  InvertSpeedAll,
  MagicMissileId,
  MindShatterId,
  NegateArmorId,
  PiercingStrikeId,
  Poison,
  PoisonSprayId,
  PotionActionId,
  PowerCleaveId,
  PowerStanceId,
  PowerWordKillId,
  Protect,
  ProtectedParentId,
  ProtectId,
  QuickAttack,
  QuickAttackId,
  Rest,
  RestId,
  RetreatingBlowId,
  Sandstorm,
  SandstormId,
  SandstormOnTurnEndId,
  SetIsActiveId,
  Slash,
  SlashId,
  Spikes,
  SpikesId,
  StunnedParentId,
  SwitchUnitId,
  SwordsDance,
  SwordsDanceId,
  TauntId,
  ThunderboltId,
  TrickRoomId,
  UpdateFlagParent,
  UpdateStatStageParent,
  Ward,
  WardId,
  WillOWispId,
} from '@repo/game/data'
import { Action, ActionResult, CombatContext, Unit } from '@repo/game/types'
import { DamageInline } from '@shared/DamageInline'
import { MagicArmor } from '@shared/MagicArmor'
import { ModifierInline } from '@shared/ModifierInline'
import { StatusInline } from '@shared/StatusInline'
import { TextList } from '@shared/TextList'
import { ReactNode } from 'react'
import { ACTION_NAMES } from './_names'
import { ArmorUpRenderer } from './ArmorUp'
import { BattleStanceRenderer } from './BattleStance'
import { BiteRenderer } from './Bite'
import { BodySlamRenderer } from './BodySlam'
import { DragonStanceRenderer } from './DragonStance'
import { HexRenderer } from './Hex'
import { MindShatterRenderer } from './MindShatter'
import { NegateArmorRenderer } from './NegateArmor'
import { PiercingStrikeRenderer } from './PiercingStrike'
import { PowerCleaveRenderer } from './PowerCleave'
import { PowerStanceRenderer } from './PowerStance'
import { RetreatingBlowRenderer } from './RetreatingBlow'
import { TauntRenderer } from './Taunt'
import { ThunderboltRenderer } from './Thunderbolt'

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
  [ArmorUpId]: ArmorUpRenderer,
  [BattleStanceId]: BattleStanceRenderer,
  [BiteId]: BiteRenderer,
  [BodySlamId]: BodySlamRenderer,
  [DragonStanceId]: DragonStanceRenderer,
  [HexId]: HexRenderer,
  [MindShatterId]: MindShatterRenderer,
  [NegateArmorId]: NegateArmorRenderer,
  [PiercingStrikeId]: PiercingStrikeRenderer,
  [PowerCleaveId]: PowerCleaveRenderer,
  [PowerStanceId]: PowerStanceRenderer,
  [RetreatingBlowId]: RetreatingBlowRenderer,
  [TauntId]: TauntRenderer,
  [ThunderboltId]: ThunderboltRenderer,

  /// SYSTEM ACTIONS
  [SetIsActiveId]: {
    name: ACTION_NAMES[SetIsActiveId],
    description: () => <></>,
    log: (_, __, targets, ctx) => (
      <span>
        <TextList>
          {targets.map((target, i) => (
            <LogUnit key={target.id} teamId={target.teamId} user={ctx.user}>
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
      <span>
        <LogUnit teamId={target.teamId} user={ctx.user}>
          {target.name}
        </LogUnit>{' '}
        is switched in for{' '}
        <LogUnit teamId={source?.teamId} user={ctx.user}>
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
  [DisableId]: {
    name: 'Disable',
    description: (action, props) => {
      const disable = action as Disable
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
        Deals <DamageInline damage={action.damage} /> to all other units.
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
          Deals <DamageInline damage={fireball.damage} /> to target enemy unit.
          Deals <DamageInline damage={fireball.splashDamage} /> to all other
          active enemy units.
        </>
      )
    },
  },
  [FireBlastId]: {
    name: ACTION_NAMES[FireBlastId],
    description: (action, props) => {
      const fireblast = action as FireBlast
      return (
        <div>
          Deals <DamageInline damage={action.damage} /> to target enemy unit.{' '}
          {fireblast.burnChance}% chance to apply{' '}
          <StatusInline status={Burn} side={props?.side} />.
        </div>
      )
    },
  },
  [FirePunchId]: {
    name: ACTION_NAMES[FirePunchId],
    description: (action, props) => {
      const firepunch = action as FirePunch
      return (
        <div>
          Deals <DamageInline damage={action.damage} /> to target enemy unit.{' '}
          {firepunch.burnChance}% chance to apply{' '}
          <StatusInline status={Burn} side={props?.side} />.
        </div>
      )
    },
  },
  [FurySwipesId]: {
    name: 'Fury Swipes',
    description: (action) => {
      const furySwipes = action as any as FurySwipes
      return (
        <div>
          Deals <DamageInline damage={furySwipes.damage} /> to target enemy
          unit. Repeats 4-6 times.
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
                duration: holdperson.duration,
              })
            }
          />{' '}
          to target enemy unit for {holdperson.duration - 1} turns.
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
          Deals <DamageInline damage={hyperbeam.damage} /> equal to twice this
          unit's magic stat to target enemy unit. Applies{' '}
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
  [IcyWindId]: {
    name: 'Icy Wind',
    description: (action) => (
      <>
        Applies <span className="font-bold text-white">Speed Down</span> to
        target enemy unit.
        {action.priority !== 0 && <> Priority {action.priority}.</>}
      </>
    ),
  },
  [MagicMissileId]: {
    name: 'Magic Missile',
    description: (action) => (
      <>
        Deals <DamageInline damage={action.damage} /> to 2 target enemy units.
        This action cannot miss.
      </>
    ),
  },
  [QuickAttackId]: {
    name: 'Quick Attack',
    description: (action) => {
      const quickAttack = action as QuickAttack
      return (
        <>
          Deals <DamageInline damage={quickAttack.damage} /> to target enemy
          unit.
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
          Deals <DamageInline damage={poisionSpray.damage} /> to target enemy
          unit and applies <StatusInline side={props?.side} status={Poison} />.
        </>
      )
    },
  },
  [PowerWordKillId]: {
    name: ACTION_NAMES[PowerWordKillId],
    description: (action) => (
      <>
        Deals <DamageInline damage={action.damage} /> to target enemy unit.
        Ignores all damage negation.
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
                registryId: StunnedParentId,
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
  [SandstormId]: {
    name: ACTION_NAMES[SandstormId],
    description: (action) => {
      const sandstorm = action as Sandstorm
      return (
        <div>
          Applies{' '}
          <ModifierInline
            modifier={
              new DamageAllOnTurnEnd({
                registryId: SandstormOnTurnEndId,
                factor: sandstorm.damageFactor,
                damageType: 'force',
                duration: sandstorm.duration,
              })
            }
          />{' '}
          to the battlefield.
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
          Deals <DamageInline damage={slash.damage} /> to target enemy unit.
          High critical chance.
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
              new DamageNewUnitsOnUnitEnter({ static: spikes.enterDamage })
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
                offset: swordsDance.offset,
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
          This unit gains <MagicArmor>{ward.amount}</MagicArmor>
        </>
      )
    },
  },
  [WillOWispId]: {
    name: 'Will-O-Wisp',
    cost: () => '20 FP',
    costAlt: <span className="text-blue-300">20 FP</span>,
    description: (action, props) => (
      <div>
        Applies <StatusInline status={Burn} side={props?.side} /> to target
        enemy unit.
      </div>
    ),
    lore: () => (
      <>
        The user shoots a sinister, bluish-white flame at the target. Said to
        harbor the power of death.
      </>
    ),
  },
  [PotionActionId]: {
    name: ACTION_NAMES[PotionActionId],
    description: () => 'Heals 30 damage on target unit.',
  },
}
