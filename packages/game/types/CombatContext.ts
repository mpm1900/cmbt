import { Id } from '.'
import { Modifier } from './Modifier'
import { Unit } from './Unit'

export type CombatContext = {
  units: Unit[]
  modifiers: Modifier[]
  user: Id
  actionCooldowns: { [key: Id]: { [key: Id]: number } }
}
