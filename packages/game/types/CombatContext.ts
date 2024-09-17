import { ActionsQueueItem, Id, Turn } from '.'
import { Modifier } from './Modifier'
import { Team } from './Team'
import { Unit } from './Unit'

export type CombatContext = {
  queue: ActionsQueueItem[]
  units: Unit[]
  modifiers: Modifier[]
  teams: Team[]
  turn: Turn
  user: Id
  actionCooldowns: { [key: Id]: { [key: Id]: number } }
}
