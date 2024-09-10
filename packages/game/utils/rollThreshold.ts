import random from 'random'
import { Action, ActionAccuracyResult, Unit } from '../types'

export function rollThreshold(
  source: Unit,
  action: Action
): ActionAccuracyResult {
  const threshold = action.threshold(source)
  const criticalThreshold = action.criticalThreshold(source)
  const criticalFactor = action.criticalFactor(source)
  const roll = random.int(0, 100)
  const success = (threshold === undefined ? 100 : threshold) >= roll
  const criticalSuccess =
    (criticalThreshold === undefined ? -1 : criticalThreshold) >= roll

  return {
    roll,
    success,
    threshold,
    criticalFactor,
    criticalThreshold,
    criticalSuccess,
  }
}
