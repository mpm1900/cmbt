import { Action } from '../types'

export function getActionDamageRating(action: Action) {
  return action.damages.map((d) => d.power ?? 0)
}
