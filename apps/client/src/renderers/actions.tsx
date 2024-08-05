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
  PotionId,
} from '@repo/game/data'
import { Action, CombatContext, Unit } from '@repo/game/types'
import { Fragment, ReactNode } from 'react'

export type ActionRenderer = {
  name: string
  cost: ReactNode
  costAlt?: ReactNode
  description: (action: Action) => ReactNode
  help?: (action: Action) => ReactNode
  lore?: (action: Action) => ReactNode
  log?: (
    action: Action,
    source: Unit | undefined,
    targets: Unit[],
    ctx: CombatContext
  ) => ReactNode
}

export const ACTION_NAMES: Record<string, string> = {
  [SetIsActiveId]: 'Set IsActive',
  [SwitchUnitId]: 'Switch Units',

  [DisableId]: 'Disable',
  [ExplosionId]: 'Explosion',
  [FireballId]: 'Fireball',
  [FurySwipesId]: 'Fury Swipes',
  [HyperBeamId]: 'Hyper Beam',
  [IcyWindId]: 'Icy Wind',
  [MagicMissileId]: 'Magic Missile',
  [PowerWordKillId]: 'Power Word Kill',
  [QuickAttackId]: 'Quick Attack',
  [SandstormId]: 'Sandstorm',
  [SwordsDanceId]: 'Swords Dance',
  [TrickRoomId]: 'Trick Room',
  [WillOWispId]: 'Will-o-wisp',

  [PotionId]: 'Potion',
}

export const ActionRenderers: Record<string, ActionRenderer> = {
  /// SYSTEM ACTIONS
  [SetIsActiveId]: {
    name: ACTION_NAMES[SetIsActiveId],
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
        join{targets.length > 0 ? '' : 's'} the battle!
      </span>
    ),
  },
  [SwitchUnitId]: {
    name: ACTION_NAMES[SwitchUnitId],
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

  /// OTHER ACTIONS
  [DisableId]: {
    name: 'Disable',
    cost: '',
    description: (action) => (
      <>
        Applies <span className="font-bold">Disabled</span> to target enemy unit
        for 2 turns.
      </>
    ),
    help: () => <div>(The unit cannot use their last used action.)</div>,
  },
  [ExplosionId]: {
    name: 'Explosion',
    cost: '',
    description: (action) => (
      <>
        Deals damage equal to 4 times this unit's physical stat to all other
        units. This unit's health becomes zero.
      </>
    ),
  },
  [MagicMissileId]: {
    name: 'Magic Missile',
    cost: '',
    description: (action) => (
      <>Deals 6 damage to 2 target enemy units. This action cannot miss.</>
    ),
  },
  [QuickAttackId]: {
    name: 'Quick Attack',
    cost: '',
    description: (action) => <>Deals 5 damage to target enemy unit.</>,
  },
  [PowerWordKillId]: {
    name: ACTION_NAMES[PowerWordKillId],
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
  [SandstormId]: {
    name: 'Sandstorm',
    cost: '',
    description: (action) => (
      <>
        Applies <span className="font-bold">Sandstorm</span> to all units for 5
        turns.
      </>
    ),
    help: () => <>(At the end of each turn, the unit takes 10 damage.)</>,
  },
  [SwordsDanceId]: {
    name: 'Swords Dance',
    cost: <span>30 FP</span>,
    description: (action) => (
      <>
        Applies{' '}
        <span className="font-bold text-muted-foreground">Power Up</span> to
        this unit.
      </>
    ),
    help: () => (
      <div className="text-muted-foreground">
        (The unit's physical stat is multiplied by 1.5)
      </div>
    ),
  },
  [FireballId]: {
    name: ACTION_NAMES[FireballId],
    cost: '',
    description: (action) => {
      const fireball = action as Fireball
      return (
        <>
          Deals {fireball.damage} base fire damage to target enemy unit. Other
          active units on the target unit's team also take 30% of the damage
          dealt.
        </>
      )
    },
  },
  [FurySwipesId]: {
    name: 'Fury Swipes',
    cost: '',
    description: (action) => {
      const furySwipes = action as FurySwipes
      return (
        <>
          Deals {furySwipes.damage.value} damage to target enemy unit. Repeats
          4-6 times.
        </>
      )
    },
  },
  [HyperBeamId]: {
    name: ACTION_NAMES[HyperBeamId],
    cost: '30 FP',
    costAlt: <span className="text-blue-300">30 FP</span>,
    description: (action) => (
      <>
        Deals base force damage equal to this unit's magic stat to target enemy
        unit. Apply{' '}
        <span className="font-bold text-muted-foreground">Recharging</span> to
        this unit for 1 turn.
      </>
    ),
    help: () => <>(The unit cannot act while Recharging.)</>,
  },
  [IcyWindId]: {
    name: 'Icy Wind',
    cost: '',
    description: (action) => (
      <>
        Applies <span className="font-bold">Speed Down</span> to target enemy
        unit.
        {action.priority !== 0 && <> Priority {action.priority}.</>}
      </>
    ),
    help: () => <>(The unit's speed stat is reduced by 10.)</>,
  },
  [TrickRoomId]: {
    name: 'Trick Room',
    cost: '',
    description: (action) => (
      <>
        Applies <span className="font-bold">Trick Room</span> to all units.
      </>
    ),
    help: () => <>(The unit's speed stat is multiplied by -1.)</>,
  },
  [WillOWispId]: {
    name: 'Will-O-Wisp',
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
        Applies <span className="font-bold text-modifiers-burned">Burn</span> to
        target enemy unit for 5 turns.
      </>
    ),
    help: () => (
      <div className="text-modifiers-burned/50">
        (The unit's physical stat is halved. At the end of each turn, the unit
        takes 10 damage.)
      </div>
    ),
  },
  [PotionId]: {
    name: ACTION_NAMES[PotionId],
    cost: '',
    description: () => 'Heals 20 damage from target friendly unit.',
    log: (action, source, [target], ctx) => (
      <span>
        <span className="text-purple-300">{ACTION_NAMES[PotionId]}</span> was
        used on{' '}
        <LogUnit teamId={target.teamId} user={ctx.user}>
          {target.name}
        </LogUnit>
      </span>
    ),
  },
}
