import { LogUnit } from '@/components/ui/log'
import {
  ArmorUp,
  ArmorUpId,
  BodySlam,
  BodySlamId,
  BurnStatus,
  DamageNewUnitsOnUnitEnter,
  DamagePercentAllOnTurnEnd,
  DefenseDownParent,
  DisableId,
  EarthquakeId,
  ExplosionId,
  Fireball,
  FireballId,
  FireBlastId,
  FirePunchId,
  FurySwipes,
  FurySwipesId,
  HoldPersonId,
  HyperBeamId,
  IcyWindId,
  InspectAllId,
  InvertSpeedAll,
  MagicMissileId,
  PhysicalAttackUpParent,
  PiercingStrike,
  PiercingStrikeId,
  PoisonSprayId,
  PoisonStatus,
  PotionActionId,
  PowerWordKillId,
  ProtectId,
  QuickAttack,
  QuickAttackId,
  RestId,
  SandstormId,
  SandstormOnTurnEndId,
  SetIsActiveId,
  SetIsInspectedAll,
  SetIsProtectedParent,
  SetIsStunnedParent,
  Slash,
  SlashId,
  SpikesId,
  SwitchUnitId,
  SwordsDanceId,
  TrickRoomId,
  WardId,
  WillOWispId,
} from '@repo/game/data'
import { Action, ActionResult, CombatContext, Unit } from '@repo/game/types'
import { DamageInline } from '@shared/DamageInline'
import { MagicArmor } from '@shared/MagicArmor'
import { ModifierInline } from '@shared/ModifierInline'
import { PhysicalArmor } from '@shared/PhysicalArmor'
import { StatusInline } from '@shared/StatusInline'
import { TextList } from '@shared/TextList'
import { ReactNode } from 'react'
import { ACTION_NAMES } from './_names'

export * from './_names'

export type ActionRenderer = {
  name: string
  baseDamage: (action: Action) => string
  cost: string
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
  /// SYSTEM ACTIONS
  [SetIsActiveId]: {
    name: ACTION_NAMES[SetIsActiveId],
    baseDamage: () => '',
    cost: '',
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
    baseDamage: () => '',
    cost: '',
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
    baseDamage: () => '',
    cost: '',
    description: (action, props) => (
      <>
        Applies{' '}
        <ModifierInline
          modifier={new SetIsInspectedAll({})}
          side={props?.side}
        />{' '}
        to all enemy units.
      </>
    ),
  },

  /// OTHER ACTIONS
  [ArmorUpId]: {
    name: ACTION_NAMES[ArmorUpId],
    baseDamage: () => '',
    cost: '',
    description: (action) => {
      const armorup = action as ArmorUp
      return (
        <>
          This unit gains <PhysicalArmor>{armorup.amount * -1}</PhysicalArmor>
        </>
      )
    },
  },
  [BodySlamId]: {
    name: ACTION_NAMES[BodySlamId],
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
    description: (action) => {
      const bodyslam = action as BodySlam
      return (
        <>
          Deals <DamageInline damage={bodyslam.damage} /> to target enemey unit.
          If this attack misses, deals{' '}
          <DamageInline damage={bodyslam.missDamage} /> base damage to this unit
          instead.
        </>
      )
    },
  },
  [PiercingStrikeId]: {
    name: ACTION_NAMES[PiercingStrikeId],
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
    description: (action, props) => {
      const crunch = action as PiercingStrike
      return (
        <>
          Deals <DamageInline damage={crunch.damage} /> to target enemy unit.
          20% chance to apply{' '}
          <ModifierInline
            side={props?.side}
            modifier={new DefenseDownParent({ factor: 1.5 })}
          />{' '}
          to target.
        </>
      )
    },
  },
  [DisableId]: {
    name: 'Disable',
    baseDamage: () => '',
    cost: '',
    description: (action) => (
      <>
        Applies <span className="font-bold text-white">Disabled</span> to target
        enemy unit for 2 turns.
      </>
    ),
    help: () => <div>(The unit cannot use their last used action.)</div>,
  },
  [EarthquakeId]: {
    name: ACTION_NAMES[EarthquakeId],
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
    description: (action) => (
      <>
        Deals <DamageInline damage={action.damage} /> to all other units.
      </>
    ),
  },
  [ExplosionId]: {
    name: 'Explosion',
    baseDamage: () => 'ƒx',
    cost: '',
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
      return `${fireball.damage.value} (${fireball.splashDamage.value})`
    },
    cost: '',
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
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
    description: (action, props) => (
      <>
        Deals <DamageInline damage={action.damage} /> to target enemy unit. 10%
        chance to apply <StatusInline status={BurnStatus} side={props?.side} />{' '}
        to target for 5 turns.
      </>
    ),
  },
  [FirePunchId]: {
    name: ACTION_NAMES[FirePunchId],
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
    description: (action, props) => (
      <>
        Deals <DamageInline damage={action.damage} /> to target enemy unit. 10%
        chance to apply <StatusInline status={BurnStatus} side={props?.side} />{' '}
        to target for 5 turns.
      </>
    ),
  },
  [FurySwipesId]: {
    name: 'Fury Swipes',
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
    description: (action) => {
      const furySwipes = action as any as FurySwipes
      return (
        <>
          Deals <DamageInline damage={furySwipes.damage} /> to target enemy
          unit. Repeats 4-6 times.
        </>
      )
    },
  },
  [HoldPersonId]: {
    name: ACTION_NAMES[HoldPersonId],
    baseDamage: () => '',
    cost: '',
    description: (action, props) => {
      return (
        <>
          Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={new SetIsStunnedParent({})}
          />{' '}
          to target enemy unit for 2 turns.
        </>
      )
    },
  },
  [HyperBeamId]: {
    name: ACTION_NAMES[HyperBeamId],
    baseDamage: () => 'ƒ(x)',
    cost: '30 FP',
    costAlt: <span className="text-blue-300">30 FP</span>,
    description: (action, props) => (
      <>
        Deals base force damage equal to twice this unit's magic stat to target
        enemy unit. Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={new SetIsStunnedParent({})}
        />{' '}
        to this unit for 1 turn.
      </>
    ),
  },
  [IcyWindId]: {
    name: 'Icy Wind',
    baseDamage: () => '',
    cost: '',
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
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
    description: (action) => (
      <>
        Deals <DamageInline damage={action.damage} /> to 2 target enemy units.
        This action cannot miss.
      </>
    ),
  },
  [QuickAttackId]: {
    name: 'Quick Attack',
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
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
    baseDamage: (a) => `${a.damage?.value}`,
    cost: '',
    description: (action, props) => {
      const poisionSpray = action as QuickAttack
      return (
        <>
          Deals <DamageInline damage={poisionSpray.damage} /> to target enemy
          unit and applies{' '}
          <StatusInline side={props?.side} status={PoisonStatus} />.
        </>
      )
    },
  },
  [PowerWordKillId]: {
    name: ACTION_NAMES[PowerWordKillId],
    baseDamage: () => '∞',
    cost: '',
    description: () => (
      <>
        Deals <span className="text-white">∞ damage</span> to target enemy unit.
        Ignores all damage negation.
      </>
    ),
    lore: () => (
      <>"Some spells are just too powerful to be allowed." -Game Developer</>
    ),
  },
  [ProtectId]: {
    name: ACTION_NAMES[ProtectId],
    baseDamage: () => '',
    cost: '',
    description: (action, props) => (
      <>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={new SetIsProtectedParent({})}
        />{' '}
        to this unit for 1 turn. Cannot be used twice in a row.
      </>
    ),
    failureLog: (result) => <>Protect failed.</>,
  },
  [RestId]: {
    name: ACTION_NAMES[RestId],
    baseDamage: () => '',
    cost: '',
    description: (action, props) => (
      <>
        Removes all damage from this unit. Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={new SetIsStunnedParent({})}
        />{' '}
        to this unit for 2 turns.
      </>
    ),
  },
  [SandstormId]: {
    name: ACTION_NAMES[SandstormId],
    baseDamage: () => '',
    cost: '',
    description: (action) => (
      <>
        Applies{' '}
        <ModifierInline
          modifier={
            new DamagePercentAllOnTurnEnd({
              rid: SandstormOnTurnEndId,
              factor: 0.1,
            })
          }
        />{' '}
        to all units for 5 turns.
      </>
    ),
  },
  [SlashId]: {
    name: ACTION_NAMES[SlashId],
    baseDamage: (a) => `${a.damage?.value}`,
    cost: '',
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
    baseDamage: () => '',
    cost: '',
    description: (action, props) => (
      <>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={new DamageNewUnitsOnUnitEnter({ damage: 20 })}
        />{' '}
        to all units.
      </>
    ),
    successLog: () => (
      <span className="text-muted-foreground">
        Spikes were put onto the battle!
      </span>
    ),
  },
  [SwordsDanceId]: {
    name: 'Swords Dance',
    baseDamage: () => '',
    cost: '30 FP',
    description: (action, props) => (
      <>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={new PhysicalAttackUpParent({ factor: 1.5 })}
        />{' '}
        to this unit.
      </>
    ),
  },
  [TrickRoomId]: {
    name: 'Trick Room',
    baseDamage: () => '',
    cost: '',
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
    baseDamage: () => '',
    cost: '',
    description: (action) => {
      const ward = action as ArmorUp
      return (
        <>
          This unit gains <MagicArmor>{ward.amount * -1}</MagicArmor>
        </>
      )
    },
  },
  [WillOWispId]: {
    name: 'Will-O-Wisp',
    baseDamage: () => '',
    cost: '20 FP',
    costAlt: <span className="text-blue-300">20 FP</span>,
    lore: () => (
      <>
        The user shoots a sinister, bluish-white flame at the target. Said to
        harbor the power of death.
      </>
    ),
    description: (action, props) => (
      <>
        Applies <StatusInline status={BurnStatus} side={props?.side} /> to
        target enemy unit for 5 turns.
      </>
    ),
  },
  [PotionActionId]: {
    name: ACTION_NAMES[PotionActionId],
    baseDamage: () => '',
    cost: '',
    description: () => 'Heals 20 damage from target friendly unit.',
    log: (action, source, [target], ctx) => (
      <span>
        <span className="text-purple-300">{ACTION_NAMES[PotionActionId]}</span>{' '}
        was used on{' '}
        <LogUnit teamId={target.teamId} user={ctx.user}>
          {target.name}
        </LogUnit>
      </span>
    ),
  },
}
