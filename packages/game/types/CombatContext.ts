import { Id, Turn } from '.'
import { Modifier } from './Modifier'
import { Team } from './Team'
import { Unit } from './Unit'

export type CombatContext = {
  units: Unit[]
  modifiers: Modifier[]
  teams: Team[]
  turn: Turn
  user: Id
  log: (node: React.ReactNode) => void
  // queue: ActionsQueueItem[]
}
