import { ActionMaker, Unit } from '../../types'
import { InspectAllId } from '../Ids'
import { InspectAll } from './system'

export * from './system'

export * from './ArmorUp'
export * from './BattleStance'
export * from './BodySlam'
export * from './Disable'
export * from './DragonStance'
export * from './Earthquake'
export * from './Explosion'
export * from './Fireball'
export * from './FireBlast'
export * from './FirePunch'
export * from './FurySwipes'
export * from './HoldPerson'
export * from './HyperBeam'
export * from './IcyWind'
export * from './MagicMissile'
export * from './NegateArmor'
export * from './PiercingStrike'
export * from './PoisonSpray'
export * from './PowerWordKill'
export * from './Protect'
export * from './QuickAttack'
export * from './Rest'
export * from './Sandstorm'
export * from './Slash'
export * from './Spikes'
export * from './SwordsDance'
export * from './system/SwitchUnits'
export * from './TrickRoom'
export * from './Ward'
export * from './WillOWisp'

export const GLOBAL_ACTIONS: ActionMaker[] = [
  {
    id: InspectAllId,
    make: (unit: Unit) => new InspectAll(unit.id, unit.teamId),
  },
]
