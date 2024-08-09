import { ActionMaker, Unit } from '../../types'
import { InspectAll, InspectAllId } from './system'

export * from './system'

export * from './ArmorUp'
export * from './BodySlam'
export * from './Crunch'
export * from './Disable'
export * from './Earthquake'
export * from './Fireball'
export * from './FireBlast'
export * from './FirePunch'
export * from './Explosion'
export * from './FurySwipes'
export * from './IcyWind'
export * from './HyperBeam'
export * from './MagicMissile'
export * from './PowerWordKill'
export * from './Protect'
export * from './QuickAttack'
export * from './Rest'
export * from './Sandstorm'
export * from './Spikes'
export * from './SwordsDance'
export * from './system/SwitchUnits'
export * from './TrickRoom'
export * from './WillOWisp'

export const GLOBAL_ACTIONS: ActionMaker[] = [
  {
    id: InspectAllId,
    make: (unit: Unit) => new InspectAll(unit.id, unit.teamId),
  },
]
