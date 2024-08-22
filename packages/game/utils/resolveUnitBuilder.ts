import {
  UpdateDamageExpansionParent,
  UpdateDamageNegationParent,
  ZERO_UNIT,
} from '../data'
import { UnitId } from '../data/Ids/_base'
import { Id, Modifier, Mutation, Unit, UnitBuilder } from '../types'
import { applyMutations } from './applyModifiers'
import { mapBaseStat } from './mapBaseStat'

function getMutationsFromBuilder(builder: UnitBuilder, unit: Unit): Mutation[] {
  const abilityMutations = builder.ability?.mutations(unit) ?? []
  const affinityModifiers = builder.base.affinities.map(
    (a) =>
      new UpdateDamageExpansionParent({
        sourceId: unit.id,
        parentId: unit.id,
        damageType: a.type,
        offset: a.factor,
      })
  )
  const resistanceModifiers = builder.base.resistances.map(
    (a) =>
      new UpdateDamageNegationParent({
        sourceId: unit.id,
        parentId: unit.id,
        damageType: a.type,
        offset: a.factor,
      })
  )
  const weaknessModifiers = builder.base.weaknesses.map(
    (a) =>
      new UpdateDamageNegationParent({
        sourceId: unit.id,
        parentId: unit.id,
        damageType: a.type,
        offset: a.factor * -1,
      })
  )
  abilityMutations.push(...affinityModifiers)
  abilityMutations.push(...resistanceModifiers)
  abilityMutations.push(...weaknessModifiers)
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
    baseId: builder.base.id,
    name: builder.name,
    level: builder.level,
    stats: {
      ...builder.base.stats,
      health: mapBaseStat('health', builder.base.stats.health, builder.level),
      physical: mapBaseStat(
        'physical',
        builder.base.stats.physical,
        builder.level
      ),
      defense: mapBaseStat(
        'defense',
        builder.base.stats.defense,
        builder.level
      ),
      magic: mapBaseStat('magic', builder.base.stats.magic, builder.level),
      speed: mapBaseStat('speed', builder.base.stats.speed, builder.level),
    },
    values: ZERO_UNIT.values,
    flags: ZERO_UNIT.flags,
    registry: ZERO_UNIT.registry,
    modifiers: () => [],
    actions: [],
    metadata: ZERO_UNIT.metadata,
  }

  unit.stats = {
    ...unit.stats,
  }

  unit.values = {
    ...unit.values,
    focus: unit.stats.focus,
    stamina: unit.stats.stamina,
    devotion: unit.stats.devotion,
  }

  unit.actions = [...builder.actions.map((a) => a.make(unit))]

  const mutations = getMutationsFromBuilder(builder, unit)
  const modifiers = getModifiersFromBuilder(builder, unit)
  const oldMods = unit.modifiers()
  unit.modifiers = () => [...oldMods, ...modifiers]
  const ret = applyMutations(unit, mutations)
  return ret
}
