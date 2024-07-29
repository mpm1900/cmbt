import { Unit, UnitId } from '../types'
import {
  Fireball,
  FurySwipes,
  HyperBeam,
  IcyWind,
  MagicMissile,
  PowerWordKill,
  QuickAttack,
  Sandstorm,
  SwordsDance,
  TrickRoom,
  WillOWisp,
} from '../data'
import random from 'random'
import { Explosion } from '../data/Actions/Explosion'
import { Disable } from '../data/Actions/Disable'

export const ZERO_UNIT: Unit = {
  id: '',
  name: '',
  teamId: '',
  stats: {
    health: 0,
    defense: 0,
    physical: 0,
    magic: 0,
    speed: 0,
    accuracy: 0,
    focus: 0,
    energy: 0,

    fireNegation: 0,
    forceNegation: 0,
    lightningNegation: 0,

    fireExpansion: 0,
    forceExpansion: 0,
    lightningExpansion: 0,
  },
  values: {
    damage: 0,
    focus: 0,
    energy: 0,
  },
  flags: {
    isActive: false,
    isRecharging: false,
  },
  registry: {
    actions: [],
    modifiers: [],
  },
  modifiers: () => [],
  actions: [],
  metadata: {
    lastUsedActionId: undefined,
    modified: false,
    hasBeenSeen: false,
  },
}

export function unitBuilder(
  partial: Partial<Unit>,
  map: (unit: Unit) => Partial<Unit>
): Unit {
  const base = {
    ...ZERO_UNIT,
    ...partial,
  }

  return {
    ...base,
    ...map(base),
  }
}

export function makeUnit(teamId: string, name?: string, isActive?: boolean) {
  const id = UnitId()
  return unitBuilder(
    {
      id,
      name: name ?? id,
      teamId,
      stats: {
        ...ZERO_UNIT.stats,
        speed: random.int(70, 140),
        physical: random.int(70, 140),
        magic: random.int(70, 140),
        defense: random.int(50, 100),
        health: random.int(250, 440),
        focus: random.int(0, 100),
        energy: random.int(0, 100),
      },
      flags: {
        isActive: isActive ?? false,
        isRecharging: false,
      },
    },
    (unit) => ({
      values: {
        damage: 30,
        focus: unit.stats.focus,
        energy: unit.stats.energy,
      },
      actions: [
        new Explosion(unit.id, unit.teamId),
        new PowerWordKill(unit.id, unit.teamId),
        new HyperBeam(unit.id, unit.teamId),

        new WillOWisp(unit.id, unit.teamId),
        new Disable(unit.id, unit.teamId),
        new Fireball(unit.id, unit.teamId),
        new QuickAttack(unit.id, unit.teamId),
        new FurySwipes(unit.id, unit.teamId),
        new SwordsDance(unit.id, unit.teamId),
        new MagicMissile(unit.id, unit.teamId),
        new IcyWind(unit.id, unit.teamId),
        new Sandstorm(unit.id, unit.teamId),
        new TrickRoom(unit.id, unit.teamId),
      ],
      modifiers: () => [],
    })
  )
}
