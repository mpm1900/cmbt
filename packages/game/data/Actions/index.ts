import { ActionMaker, Unit } from '../../types'
import { InspectAllId } from '../Ids'
import { InspectAll } from './system'

export * from './system'

export * from './ACallBeyond'
export * from './ArmorUp'
export * from './Bane'
export * from './Bite'
export * from './Bless'
export * from './BodySlam'
export * from './ChillingGrasp'
export * from './DeathRites'
export * from './DispelMagic'
export * from './DragonBreath'
export * from './DragonStance'
export * from './Earthquake'
export * from './ElixirOfPower'
export * from './Explosion'
export * from './Fireball'
export * from './FirePunch'
export * from './Firestorm'
export * from './GhostFlame'
export * from './GuidingRay'
export * from './Hide'
export * from './HoldPerson'
export * from './HyperBeam'
export * from './InfernalBlast'
export * from './Intoxicate'
export * from './LightningBolt'
export * from './MagicMissile'
export * from './MemoryLeak'
export * from './MindBlast'
export * from './MindShatter'
export * from './MindTwist'
export * from './NegateArmor'
export * from './PiercingStrike'
export * from './PoisonSpray'
export * from './PowerCleave'
export * from './PowerStance'
export * from './PowerSwap'
export * from './PowerWordKill'
export * from './Protect'
export * from './Pyroclash'
export * from './QuickAttack'
export * from './Rest'
export * from './RetreatingBlow'
export * from './SearingLight'
export * from './Slash'
export * from './SneakAttack'
export * from './Spikes'
export * from './SwordsDance'
export * from './Taunt'
export * from './TimeBend'
export * from './TrickRoom'
export * from './VampiricTouch'
export * from './Ward'
export * from './WildStrikes'

export const GLOBAL_ACTIONS: ActionMaker[] = [
  {
    id: InspectAllId,
    make: (unit: Unit) => new InspectAll(unit.id, unit.teamId),
  },
]
