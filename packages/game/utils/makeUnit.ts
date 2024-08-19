import random from 'random'
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
import { Disable } from '../data/Actions/Disable'
import { Explosion } from '../data/Actions/Explosion'
import { CelebiId } from '../data/UnitBases/Celebi'
import { ZERO_UNIT } from '../data/Units'
import { Unit } from '../types'
import { rebuildUnit } from './rebuildUnit'

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

export function makeUnit(
  teamId: string,
  name?: string,
  isActive?: boolean
): Unit {
  const id = UnitId()
  const unit = unitMaker(
    {
      id,
      name: name ?? id,
      teamId,
      level: 15,
      baseId: CelebiId,
      stats: {
        ...ZERO_UNIT.stats,
        speed: random.int(70, 140),
        physical: 100, //random.int(70, 140),
        magic: 100, // random.int(70, 140),
        defense: 100, // random.int(50, 100),
        health: random.int(250, 440),
        focus: random.int(30, 100),
        stamina: random.int(0, 100),
        devotion: random.int(0, 20),
      },
      flags: {
        ...ZERO_UNIT.flags,
        isActive: isActive ?? false,
        isInspected: true,
      },
    },
    (unit) => ({
      values: {
        ...ZERO_UNIT.values,
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
  return rebuildUnit(unit)
}
