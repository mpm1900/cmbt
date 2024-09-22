import { Action, Unit } from '../types'
import { calculateDamageAmount } from './calculateDamage'

export function getActionDamageRating(
  action: Action,
  source: Unit,
  target: Unit
) {
  const parsedDamage = action.damages.map((d) =>
    calculateDamageAmount(d, source, target)
  )
  return parsedDamage.map((d) => d.final)
}
