import { Id, Unit, UnitBase } from '../types'
import { getRandom } from './getRandom'
import { makeUnitBuilder } from './makeUnitBuilder'
import { rebuildUnit } from './rebuildUnit'
import { resolveUnitBuilder } from './resolveUnitBuilder'

export type MakeUnitConfig = {
  level: number
  teamId: Id
}

export function makeUnit(config: MakeUnitConfig, bases: UnitBase[]): Unit {
  const { level, teamId } = config
  const base = getRandom(bases)
  const builder = makeUnitBuilder(base.id, level)
  const unit = resolveUnitBuilder(builder, teamId)
  // unit.values.damage = unit.stats.health - 2

  return rebuildUnit(unit)
}
