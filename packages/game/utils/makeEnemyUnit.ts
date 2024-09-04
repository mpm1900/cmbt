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
import { Id, Unit } from '../types'
import { makeUnitBuilder } from './makeUnitBuilder'
import { rebuildUnit } from './rebuildUnit'
import { resolveUnitBuilder } from './resolveUnitBuilder'

export type MakeEnemeyUnitConfig = {
  level: number
  teamId: Id
}

export function makeEnemyUnit(config: MakeEnemeyUnitConfig): Unit {
  const { level, teamId } = config
  const baseIndex = Math.floor(Math.random() * ENEMY_BASES.length)
  const base = ENEMY_BASES[baseIndex]
  const builder = makeUnitBuilder(base.id, level)
  const unit = resolveUnitBuilder(builder, teamId)

  const actions = [
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
  ]

  return rebuildUnit(unit)
}
