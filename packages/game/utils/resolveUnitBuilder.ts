import { GLOBAL_ACTIONS, UnitId, ZERO_UNIT } from '../data'
import { Id, Modifier, Mutation, Unit, UnitBuilder } from '../types'
import { applyMutations } from './applyModifiers'

function getMutationsFromBuilder(builder: UnitBuilder, unit: Unit): Mutation[] {
  const abilityMutations = builder.ability?.mutations(unit) ?? []
  return abilityMutations
}

function getModifiersFromBuilder(builder: UnitBuilder, unit: Unit): Modifier[] {
  const abilityModifiers = builder.ability?.modifiers(unit) ?? []
  return abilityModifiers
}

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

  const mutations = getMutationsFromBuilder(builder, unit)
  const modifiers = getModifiersFromBuilder(builder, unit)
  unit.modifiers = () => modifiers
  return applyMutations(unit, mutations)
}
