import { Id } from '.'
import { Modifier } from './Modifier'
import { Team } from './Team'
import { Unit } from './Unit'

export type CombatContext = {
  units: Unit[]
  modifiers: Modifier[]
  teams: Team[]
  user: Id
  actionCooldowns: { [key: Id]: { [key: Id]: number } }
}
