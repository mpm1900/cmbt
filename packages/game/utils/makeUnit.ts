import { Unit } from '../types'
import {
  Crunch,
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
  UnitId,
  WillOWisp,
} from '../data'
import random from 'random'
import { Explosion } from '../data/Actions/Explosion'
import { Disable } from '../data/Actions/Disable'
import { ZERO_UNIT } from '../data/Units'

export function unitMaker(
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
  return unitMaker(
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
        stamina: random.int(0, 100),
        devotion: random.int(0, 20),
      },
      flags: {
        ...ZERO_UNIT.flags,
        isActive: isActive ?? false,
      },
    },
    (unit) => ({
      values: {
        ...ZERO_UNIT.values,
        damage: 30,
        focus: unit.stats.focus,
        stamina: unit.stats.stamina,
        devotion: unit.stats.devotion,
      },
      actions: [
        new Crunch(unit.id, unit.teamId),
        new Explosion(unit.id, unit.teamId),
        new PowerWordKill(unit.id, unit.teamId),
        new QuickAttack(unit.id, unit.teamId),

        new WillOWisp(unit.id, unit.teamId),
        new Disable(unit.id, unit.teamId),
        new Fireball(unit.id, unit.teamId),
        new HyperBeam(unit.id, unit.teamId),
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
