import { GLOBAL_ACTIONS, HyperBeam, UnitId, ZERO_UNIT } from '../data'
import { Id, Unit, UnitBuilder } from '../types'

export function resolveUnitBuilder(builder: UnitBuilder, teamId: Id): Unit {
  let unit: Unit = {
    id: UnitId(),
    teamId,
    name: builder.name,
    stats: builder.base.stats,
    values: ZERO_UNIT.values,
    flags: ZERO_UNIT.flags,
    registry: ZERO_UNIT.registry,
    modifiers: () => [],
    actions: [],
    metadata: ZERO_UNIT.metadata,
  }

  unit.values = {
    ...unit.values,
    focus: unit.stats.focus,
    stamina: unit.stats.stamina,
    devotion: unit.stats.devotion,
  }

  unit.actions = [
    ...builder.actions.map((a) => a.make(unit)),
    ...GLOBAL_ACTIONS.map((a) => a.make(unit)),
  ]
  //unit.actions = [new HyperBeam(unit.id, unit.teamId)]

  return unit
}
