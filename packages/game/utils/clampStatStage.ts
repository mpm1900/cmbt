import { MAX_STAT_STAGE, MIN_STAT_STAGE } from '../constants'

export function clampStatStage(stages: number): number {
  return Math.min(Math.max(stages, MIN_STAT_STAGE), MAX_STAT_STAGE)
}
