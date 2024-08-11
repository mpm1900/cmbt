import { LogUnit } from '@/components/ui/log'
import {
  SwordsDanceId,
  Fireball,
  FurySwipesId,
  HyperBeamId,
  WillOWispId,
  IcyWindId,
  ExplosionId,
  SandstormId,
  MagicMissileId,
  QuickAttackId,
  DisableId,
  TrickRoomId,
  FireballId,
  FurySwipes,
  SwitchUnitId,
  PowerWordKillId,
  SetIsActiveId,
  PotionActionId,
  QuickAttack,
  CrunchId,
  Crunch,
  EarthquakeId,
  ProtectId,
  FireBlastId,
  InspectAllId,
  SpikesId,
  ArmorUpId,
  ArmorUp,
  RestId,
  FirePunchId,
  BodySlamId,
  BodySlam,
  Sandstorm,
  DamageAllOnTurnEnd,
  SandstormOnTurnEndId,
} from '@repo/game/data'
import { Action, ActionResult, CombatContext, Unit } from '@repo/game/types'
import { Fragment, ReactNode } from 'react'
import { BurnId, InspectedId } from '../Details'
import { DetailsInline } from '@shared/DetailsInline'
import { ModifierInline } from '@shared/ModifierInline'

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

export const ActionRenderers: Record<string, ActionRenderer> = {
  /// SYSTEM ACTIONS
  [SetIsActiveId]: {
    name: ACTION_NAMES[SetIsActiveId],
    baseDamage: () => '',
    cost: '',
    description: () => <></>,
    log: (_, __, targets, ctx) => (
      <span>
        {targets.map((target, i) => (
          <Fragment key={target.id}>
            {i > 0 && i !== targets.length - 1 ? ',' : ''}
            {targets.length > 1 && i === targets.length - 1 ? ' and ' : ' '}
            <LogUnit teamId={target.teamId} user={ctx.user}>
              {target.name}
            </LogUnit>
          </Fragment>
        ))}{' '}
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
        Applies <DetailsInline detailsId={InspectedId} side={props?.side} /> to
        all enemy units.
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
      return <>This unit gains {armorup.amount * -1} physical armor.</>
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
          Deals {bodyslam.damage.value} base damage to target enemey unit. If
          this attack misses, deals {bodyslam.missDamage.value} base damage to
          this unit instead.
        </>
      )
    },
  },
  [CrunchId]: {
    name: ACTION_NAMES[CrunchId],
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
    description: (action) => {
      const crunch = action as Crunch
      return (
        <>
          Deals {crunch.damage.value} base damage to target enemy unit. 20%
          chance to apply{' '}
          <span className="font-bold text-white">Defense Down</span> to target.
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
      <>Deals {action.damage?.value} base damage to all other units.</>
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
    baseDamage: (action) =>
      `${action.damage?.value} (${Math.round((action.damage?.value ?? 0) / 3)})`,
    cost: '',
    description: (action) => {
      const fireball = action as Fireball
      return (
        <>
          Deals {fireball.damage?.value} base fire damage to target enemy unit.
          Deals {Math.round(fireball.damage.value / 3)} base fire damage to all
          other active enemy units.
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
        Deals {action.damage?.value} base fire damage to target enemy unit. 10%
        chance to apply <DetailsInline detailsId={BurnId} side={props?.side} />{' '}
        to target for 5 turns.
      </>
    ),
  },
  [FirePunchId]: {
    name: ACTION_NAMES[FirePunchId],
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
    description: (action) => (
      <>
        Deals {action.damage?.value} base fire damage to target enemy unit. 10%
        chance to apply <DetailsInline detailsId={BurnId} /> to target for 5
        turns.
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
          Deals {furySwipes.damage?.value} damage to target enemy unit. Repeats
          4-6 times.
        </>
      )
    },
  },
  [HyperBeamId]: {
    name: ACTION_NAMES[HyperBeamId],
    baseDamage: () => 'ƒ(x)',
    cost: '30 FP',
    costAlt: <span className="text-blue-300">30 FP</span>,
    description: (action) => (
      <>
        Deals base force damage equal to this unit's magic stat to target enemy
        unit. Applies <span className="font-bold text-white">Stun</span> to this
        unit for 1 turn.
      </>
    ),
    help: () => <>(The unit cannot act while Stunned.)</>,
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
        Deals {action.damage?.value} damage to 2 target enemy units. This action
        cannot miss.
      </>
    ),
  },
  [QuickAttackId]: {
    name: 'Quick Attack',
    baseDamage: (action) => `${action.damage?.value}`,
    cost: '',
    description: (action) => {
      const quickAttack = action as QuickAttack
      return <>Deals {quickAttack.damage?.value} damage to target enemy unit.</>
    },
  },
  [PowerWordKillId]: {
    name: ACTION_NAMES[PowerWordKillId],
    baseDamage: () => '∞',
    cost: '',
    description: () => (
      <>
        Deals damage to target enemy unit equal to that unit's health. Ignores
        all damage negation.
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
    description: (action) => (
      <>
        Applies <span className="font-bold text-white">Protected</span> to this
        unit for 1 turn. Cannot be used twice in a row.
      </>
    ),
    failureLog: (result) => <>Protect failed.</>,
  },
  [RestId]: {
    name: ACTION_NAMES[RestId],
    baseDamage: () => '',
    cost: '',
    description: () => (
      <>
        Removes all damage from this unit. Applies{' '}
        <span className="font-bold">Stun</span> to this unit for 2 turns.
      </>
    ),
  },
  [SandstormId]: {
    name: 'Sandstorm',
    baseDamage: () => '',
    cost: '',
    description: (action) => (
      <>
        Applies{' '}
        <ModifierInline
          modifier={
            new DamageAllOnTurnEnd({ rid: SandstormOnTurnEndId, damage: 30 })
          }
        />{' '}
        to all units for 5 turns.
      </>
    ),
    help: () => <>(At the end of each turn, the unit takes 10 damage.)</>,
  },
  [SpikesId]: {
    name: ACTION_NAMES[SpikesId],
    baseDamage: () => '',
    cost: '',
    description: (action) => (
      <>
        Applies <span className="font-bold text-white">Spikes</span> to all
        units.
      </>
    ),
    help: () => (
      <div className="text-muted-foreground">
        (On unit enter, that unit takes 30 damage.)
      </div>
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
    description: (action) => (
      <>
        Applies <span className="font-bold text-white">Power Up</span> to this
        unit.
      </>
    ),
    help: () => (
      <div className="text-muted-foreground">
        (The unit's physical stat is multiplied by 1.5)
      </div>
    ),
  },
  [TrickRoomId]: {
    name: 'Trick Room',
    baseDamage: () => '',
    cost: '',
    description: (action) => (
      <>
        Applies <span className="font-bold text-white">Trick Room</span> to all
        units.
      </>
    ),
    help: () => <>(The unit's speed stat is multiplied by -1.)</>,
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
    description: (action) => (
      <>
        Applies <DetailsInline detailsId={BurnId} /> to target enemy unit for 5
        turns.
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
