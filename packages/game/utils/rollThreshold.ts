import random from 'random'
import { Action, RollAccuracyResult, Unit } from '../types'

export function rollThreshold(
  source: Unit,
  action: Action
): RollAccuracyResult {
  const threshold = action.threshold(source)
  const critical = action.critical(source)
  const roll = random.int(0, 100)
  const success = (threshold === undefined ? 100 : threshold) >= roll
  const criticalSuccess = (critical === undefined ? 100 : critical) >= roll
  return {
    roll,
    success,
    threshold,
    critical,
    criticalSuccess,
  }
}
