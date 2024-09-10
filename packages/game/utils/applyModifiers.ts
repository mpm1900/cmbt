import { ApplyStatStages } from '../data'
import { CombatContext, Modifier, Trigger, Unit } from '../types'
import { Mutation, MutationFilterArgs } from '../types/Mutation'

export type ApplyModifiersResult = {
  unit: Unit
  appliedModifiers: Modifier[]
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
  args?: MutationFilterArgs
): ApplyModifiersResult {
  if (unit.metadata.modified) {
    console.log('double modified', unit.name)
    return { unit, appliedModifiers: [], registeredTriggers: [] }
  }
  const filterArgs: MutationFilterArgs = {
    ...(args ?? {}),
  }

  const modifiers = ctx.modifiers.concat(
    new ApplyStatStages({ sourceId: unit.id, parentId: unit.id })
  )
  // this weird loop is so that modifiers can affect if later modifiers are applied
  // one example is if a modifer grants an immunity in a prior layer
  // or if modifiers have stat requirements in their fns, things can change during
  // this functions's execution
  const result = modifiers
    .sort((a, b) => a.priority - b.priority)
    .reduce<ApplyModifiersResult>(
      (result, modifier) => {
        if (modifier.filter(result.unit, ctx, filterArgs)) {
          if (modifier instanceof Trigger) {
            result.registeredTriggers.push(modifier)
          } else {
            result.appliedModifiers.push(modifier)
            result.unit = applyMutation(result.unit, modifier)
          }
        }
        return result
      },
      { unit, appliedModifiers: [], registeredTriggers: [] }
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
