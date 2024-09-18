import random from 'random'
import { ActionAccuracyResult } from '../types'

export function rollThreshold(
  threshold: number | undefined,
  criticalThreshold: number | undefined,
  criticalFactor: number | undefined
): ActionAccuracyResult {
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
