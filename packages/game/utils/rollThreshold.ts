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
  const success = threshold !== undefined ? threshold >= roll : true
  const criticalSuccess =
    criticalThreshold !== undefined ? criticalThreshold >= roll : false

  return {
    roll,
    success,
    threshold,
    criticalFactor,
    criticalThreshold,
    criticalSuccess,
  }
}
