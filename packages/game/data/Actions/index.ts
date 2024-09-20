import { ActionMaker, Unit } from '../../types'
import { InspectAllId } from '../Ids'
import { InspectAll } from './system'

export * from './system'

export * from './ACallBeyond'
export * from './Bane'
export * from './BecomeTheStorm'
export * from './Bite'
export * from './Bless'
export * from './Block'
export * from './Boast'
export * from './BodySlam'
export * from './CallLightning'
export * from './ChainLightning'
export * from './ChillingGrasp'
export * from './Cleave'
export * from './DeathRites'
export * from './DispelMagic'
export * from './DragonBreath'
export * from './DragonStance'
export * from './Earthquake'
export * from './ElixirOfPower'
export * from './Fireball'
export * from './FirePunch'
export * from './Firestorm'
export * from './GhostFlame'
export * from './GuidingRay'
export * from './HealingPrayer'
export * from './HealingWord'
export * from './HealSelf'
export * from './Hide'
export * from './HoldCreature'
export * from './HyperBeam'
export * from './InfernalBlast'
export * from './Intoxicate'
export * from './LayOnHands'
export * from './LightningBolt'
export * from './MagicMissile'
export * from './MemoryLeak'
export * from './MindBlast'
export * from './MindShatter'
export * from './MindTwist'
export * from './NegateArmor'
export * from './PhantomSlash'
export * from './PiercingStrike'
export * from './PoisonSpray'
export * from './PowerCleave'
export * from './PowerSink'
export * from './PowerStance'
export * from './PowerWordKill'
export * from './Protect'
export * from './Provoke'
export * from './PsyStab'
export * from './Pyroclash'
export * from './RapidStrike'
export * from './Rest'
export * from './RetreatingBlow'
export * from './SearingLight'
export * from './Slash'
export * from './Smite'
export * from './SneakAttack'
export * from './SongOfRuin'
export * from './Spikes'
export * from './SwordsDance'
export * from './TimeBend'
export * from './TrickRoom'
export * from './VampiricTouch'
export * from './Ward'
export * from './WildStrikes'
export * from './WindWalk'

export const GLOBAL_ACTIONS: ActionMaker[] = [
  {
    id: InspectAllId,
    make: (unit: Unit) => new InspectAll(unit.id, unit.teamId),
  },
]
