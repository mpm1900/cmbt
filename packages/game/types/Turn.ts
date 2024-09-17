import { ActionResult } from './Action'

export type TurnStatus =
  | 'upkeep'
  | 'main'
  | 'combat'
  | 'cleanup'
  | 'cleanup-running'
  | 'end'
  | 'next'
  | 'done'

export type Turn = {
  count: number
  status: TurnStatus
  results: (ActionResult | undefined)[]
  hasRanOnTurnEndTriggers: boolean
}
