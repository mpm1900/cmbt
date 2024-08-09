import { ActionResult } from './Action'

export type TurnStatus =
  | 'init'
  | 'waiting-for-input'
  | 'running'
  | 'cleanup'
  | 'done'

export type Turn = {
  count: number
  status: TurnStatus
  results: (ActionResult | undefined)[]
  hasRanOnTurnEndTriggers: boolean
}
