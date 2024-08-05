import { ZERO_UNIT } from '../data'
import { Action, Unit, ValueKey } from '../types'
import { applyMutation } from './applyModifiers'

export function checkActionCost(action: Action, source: Unit) {
  const costs = applyMutation(ZERO_UNIT, action.cost).values
  return Object.entries(costs).every(([key, value]) => {
    return value * -1 <= source.values[key as ValueKey]
  })
}
