import { ActionResult } from './Action'

export type TurnStatus = 'upkeep' | 'main' | 'combat' | 'cleanup' | 'done'

export type Turn = {
  count: number
  status: TurnStatus
  results: (ActionResult | undefined)[]
  hasRanOnTurnEndTriggers: boolean
}
