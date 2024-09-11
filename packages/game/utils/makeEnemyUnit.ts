import { ENEMY_BASES } from '../data'
import { Id, Unit, UnitBase } from '../types'
import { makeUnitBuilder } from './makeUnitBuilder'
import { rebuildUnit } from './rebuildUnit'
import { resolveUnitBuilder } from './resolveUnitBuilder'

export type MakeEnemeyUnitConfig = {
  level: number
  teamId: Id
}

export function makeEnemyUnit(
  config: MakeEnemeyUnitConfig,
  bases: UnitBase[] = ENEMY_BASES
): Unit {
  const { level, teamId } = config
  const baseIndex = Math.floor(Math.random() * bases.length)
  const base = bases[baseIndex]
  const builder = makeUnitBuilder(base.id, level)
  const unit = resolveUnitBuilder(builder, teamId)

  return rebuildUnit(unit)
}
