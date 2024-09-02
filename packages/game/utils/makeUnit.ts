import {
  ArmorUp,
  ENEMY_BASES,
  Fireball,
  FurySwipes,
  HyperBeam,
  IcyWind,
  MagicMissile,
  PiercingStrike,
  PowerWordKill,
  QuickAttack,
  Sandstorm,
  SwordsDance,
  TrickRoom,
  Ward,
  WillOWisp,
} from '../data'
import { Disable } from '../data/Actions/Disable'
import { Explosion } from '../data/Actions/Explosion'
import { UnitId } from '../data/Ids/_base'
import { BASE_UNIT } from '../data/Units/system/BASE_UNIT'
import { Id, Unit } from '../types'
import { rebuildUnit } from './rebuildUnit'

export function unitMaker(
  partial: Partial<Unit>,
  map: (unit: Unit) => Partial<Unit>
): Unit {
  const base = {
    ...BASE_UNIT,
    ...partial,
  }

  return {
    ...base,
    ...map(base),
  }
}

export type MakeEnemeyUnitConfig = {
  index: number
  level: number
  teamId: Id
}

export function makeEnemyUnit(config: MakeEnemeyUnitConfig): Unit {
  const { index, level, teamId } = config
  const id = UnitId()
  const base = ENEMY_BASES[Math.floor(Math.random() * ENEMY_BASES.length)]
  const unit = unitMaker(
    {
      id,
      name: base.name,
      teamId,
      level,
      baseId: base.id,
      stats: {
        ...BASE_UNIT.stats,
        ...base.stats,
      },
      flags: {
        ...BASE_UNIT.flags,
        isActive: false,
      },
    },
    (unit) => ({
      values: {
        ...BASE_UNIT.values,
        focus: base.stats.focus,
        stamina: base.stats.stamina,
        devotion: base.stats.devotion,
      },
      actions: [
        new PiercingStrike(unit.id, unit.teamId),
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
        new ArmorUp(unit.id, unit.teamId),
        new Ward(unit.id, unit.teamId),
      ],
      modifiers: () => [],
    })
  )

  return rebuildUnit(unit)
}
