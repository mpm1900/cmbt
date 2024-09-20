import { ApplyStatStages, ApplyStatStagesId } from '../data'
import { CombatContext, Modifier, Trigger, Unit } from '../types'
import { Mutation, MutationFilterArgs } from '../types/Mutation'
import { getAllModifiersFromUnit } from './getModifiersFromUnit'
import { getNonTriggerModifiers } from './getNonTriggerModifiers'

export type ApplyModifiersResult = {
  unit: Unit
  appliedModifiers: Modifier[]
  delayedModifiers: Modifier[]
  registeredTriggers: Trigger[]
}

export function applyMutation(unit: Unit, mutation: Mutation): Unit {
  return {
    ...unit,
    ...mutation.resolve(unit),
  }
}

export function applyMutations(unit: Unit, mutations: Mutation[]): Unit {
  return mutations.reduce<Unit>((u: Unit, mutation: Mutation) => {
    return applyMutation(u, mutation)
  }, unit)
}

export function applyModifiers(
  unit: Unit,
  ctx: CombatContext,
  args?: MutationFilterArgs,
  filter: (mod: Modifier) => boolean = () => true
): ApplyModifiersResult {
  if (unit.metadata.modified) {
    console.log('double modified', unit.name)
    return {
      unit,
      appliedModifiers: [],
      delayedModifiers: [],
      registeredTriggers: [],
    }
  }
  const filterArgs: MutationFilterArgs = args ?? {}
  const modifiers = ctx.modifiers.concat(
    new ApplyStatStages({ sourceId: unit.id, parentId: unit.id })
  )
  // this weird loop is so that modifiers can affect if later modifiers are applied
  // one example is if a modifier grants an immunity in a prior layer
  // or if modifiers have stat requirements in their fns, things can change during
  // this functions's execution
  const result = modifiers
    .sort((a, b) => a.priority - b.priority)
    .reduce<ApplyModifiersResult>(
      (result, modifier) => {
        if (modifier.filter(result.unit, ctx, filterArgs) && filter(modifier)) {
          if (modifier.delay === undefined || modifier.delay === 0) {
            if (modifier instanceof Trigger) {
              result.registeredTriggers.push(modifier)
            } else {
              if (modifier.id !== ApplyStatStagesId) {
                result.appliedModifiers.push(modifier)
              }
              result.unit = applyMutation(result.unit, modifier)
            }
          } else {
            result.delayedModifiers.push(modifier)
          }
        }
        return result
      },
      {
        unit,
        appliedModifiers: [],
        delayedModifiers: [],
        registeredTriggers: [],
      }
    )

  return {
    ...result,
    unit: {
      ...result.unit,
      metadata: {
        ...result.unit.metadata,
        modified: true,
      },
    },
  }
}

export function applyModifiersEncounter(unit: Unit): Unit {
  const modifiers = getNonTriggerModifiers(getAllModifiersFromUnit(unit))
  return applyMutations(unit, modifiers)
}
