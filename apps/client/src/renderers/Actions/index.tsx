import { LogUnit } from '@/components/ui/log'
import {
  ArmorUp,
  ArmorUpId,
  AttackUpPlusParentId,
  BattleStanceId,
  BiteId,
  BodySlam,
  BodySlamId,
  Burn,
  DamageAllOnTurnEnd,
  DamageNewUnitsOnUnitEnter,
  DefenseDownParentId,
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
  PiercingStrike,
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
  UpdateStatParent,
  Ward,
  WardId,
  WillOWispId,
} from '@repo/game/data'
import {
  Action,
  ActionResult,
  CombatContext,
  Damage,
  Unit,
} from '@repo/game/types'
import { DamageInline } from '@shared/DamageInline'
import { MagicArmor } from '@shared/MagicArmor'
import { ModifierInline } from '@shared/ModifierInline'
import { PhysicalArmor } from '@shared/PhysicalArmor'
import { StatusInline } from '@shared/StatusInline'
import { TextList } from '@shared/TextList'
import { ReactNode } from 'react'
import { ACTION_NAMES } from './_names'
import { BattleStanceRenderer } from './BattleStance'
import { BiteRenderer } from './Bite'
import { DragonStanceRenderer } from './DragonStance'
import { HexRenderer } from './Hex'
import { MindShatterRenderer } from './MindShatter'
import { NegateArmorRenderer } from './NegateArmor'
import { PowerCleaveRenderer } from './PowerCleave'
import { PowerStanceRenderer } from './PowerStance'
import { TauntRenderer } from './Taunt'
import { ThunderboltRenderer } from './Thunderbolt'

export * from './_names'

export type ActionRenderer = {
  name: string
  baseDamage?: (action: Action) => string
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
  [BattleStanceId]: BattleStanceRenderer,
  [BiteId]: BiteRenderer,
  [DragonStanceId]: DragonStanceRenderer,
  [HexId]: HexRenderer,
  [MindShatterId]: MindShatterRenderer,
  [NegateArmorId]: NegateArmorRenderer,
  [PowerCleaveId]: PowerCleaveRenderer,
  [PowerStanceId]: PowerStanceRenderer,
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
  [ArmorUpId]: {
    name: ACTION_NAMES[ArmorUpId],
    description: (action) => {
      const armorup = action as ArmorUp
      return (
        <div>
          This unit gains <PhysicalArmor>{armorup.amount}</PhysicalArmor>
        </div>
      )
    },
  },
  [BodySlamId]: {
    name: ACTION_NAMES[BodySlamId],
    baseDamage: (action) => `${action.damage?.power}`,
    description: (action) => {
      const bodyslam = action as BodySlam
      return (
        <div>
          Deals <DamageInline damage={bodyslam.damage} /> to target enemey unit.
          If this attack misses, deals{' '}
          <DamageInline damage={bodyslam.missDamage} /> base damage to this unit
          instead.
        </div>
      )
    },
  },
  [PiercingStrikeId]: {
    name: ACTION_NAMES[PiercingStrikeId],
    baseDamage: (action) => `${action.damage?.power}`,
    description: (action, props) => {
      const crunch = action as PiercingStrike
      return (
        <div>
          Deals <DamageInline damage={crunch.damage} /> to target enemy unit.{' '}
          {crunch.defenseDownChance}% chance to apply{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateStatParent({
                registryId: DefenseDownParentId,
                stat: 'defense',
                factor: crunch.defenseDownFactor,
              })
            }
          />
          .
        </div>
      )
    },
  },
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
    baseDamage: (action) => `${action.damage?.power}`,
    description: (action) => (
      <>
        Deals <DamageInline damage={action.damage} /> to all other units.
      </>
    ),
  },
  [ExplosionId]: {
    name: 'Explosion',
    baseDamage: () => 'ƒx',
    description: (action) => (
      <>
        Deals damage equal to 4 times this unit's physical stat to all other
        units. This unit's health becomes zero.
      </>
    ),
  },

  [FireballId]: {
    name: ACTION_NAMES[FireballId],
    baseDamage: (action) => {
      const fireball = action as Fireball
      return `${fireball.damage.power} (${fireball.splashDamage.power})`
    },
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
    baseDamage: (action) => `${action.damage?.power}`,
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
    baseDamage: (action) => `${action.damage?.power}`,
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
    baseDamage: (action) => `${action.damage?.power}`,
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
    baseDamage: () => 'ƒ(x)',
    cost: () => '30 FP',
    costAlt: <span className="text-blue-300">30 FP</span>,
    description: (action, props) => {
      const hyperbeam = action as HyperBeam
      const d: Damage = {
        damageType: 'force',
        attackType: 'magic',
        power: 0,
      }
      return (
        <div>
          Deals <DamageInline damage={d} /> equal to twice this unit's magic
          stat to target enemy unit. Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateFlagParent({
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
    help: () => <>(The unit's speed stat is reduced by 10.)</>,
  },
  [MagicMissileId]: {
    name: 'Magic Missile',
    baseDamage: (action) => `${action.damage?.power}`,
    description: (action) => (
      <>
        Deals <DamageInline damage={action.damage} /> to 2 target enemy units.
        This action cannot miss.
      </>
    ),
  },
  [QuickAttackId]: {
    name: 'Quick Attack',
    baseDamage: (action) => `${action.damage?.power}`,
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
    baseDamage: (a) => `${a.damage?.power}`,
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
    baseDamage: () => '∞',
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
    baseDamage: (a) => `${a.damage?.power}`,
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
              new UpdateStatParent({
                registryId: AttackUpPlusParentId,
                stat: 'attack',
                factor: swordsDance.factor,
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
