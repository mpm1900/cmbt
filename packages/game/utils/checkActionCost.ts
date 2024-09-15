import { ZERO_UNIT } from '../data'
import { Action, Unit, ValueKey } from '../types'
import { applyMutation } from './applyModifiers'

export function checkActionCost(action: Action, source: Unit) {
  const testUnit: Unit = { ...ZERO_UNIT, stats: source.stats }
  const costs = applyMutation(testUnit, action.cost).values
  return Object.entries(costs).every(([key, value]) => {
    if (key === 'damage') {
      return source.stats.health - source.values.damage > value
    }
    return value * -1 <= source.values[key as ValueKey]
  })
}
