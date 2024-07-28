import { GameContext, Modifier, Trigger, Unit } from '../types'

export type ApplyModifiersResult = {
  unit: Unit
  appliedModifiers: Modifier[]
  registeredTriggers: Trigger[]
}

export function applyModifier(unit: Unit, modifer: Modifier): Unit {
  return {
    ...unit,
    ...modifer.fn(unit),
  }
}

export function applyModifiers(
  unit: Unit,
  ctx: GameContext
): ApplyModifiersResult {
  if (unit.modified) {
    console.log('double modified', unit.name)
    return { unit, appliedModifiers: [], registeredTriggers: [] }
  }
  // this weird loop is so that modifiers can affect if later modifiers are applied
  // one example is if a modifer grants an immunity in a prior layer
  // or if modifiers have stat requirements in their fns, things can change during
  // this functions's execution
  const result = ctx.modifiers
    .sort((a, b) => a.priority - b.priority)
    .reduce<ApplyModifiersResult>(
      (result, modifier) => {
        if (modifier.filter(result.unit, ctx)) {
          if (modifier instanceof Trigger) {
            result.registeredTriggers.push(modifier)
          } else {
            result.appliedModifiers.push(modifier)
            result.unit = applyModifier(result.unit, modifier)
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
      modified: true,
    },
  }
}
