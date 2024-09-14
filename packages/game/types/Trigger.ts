import { Id, Mutation, MutationFilterArgs, Unit } from '.'
import { CombatContext } from './CombatContext'
import { Modifier, ModifierProps } from './Modifier'

export type TriggerEvent =
  | 'on Turn Start'
  | 'on Turn End'
  | 'on Unit Enter'
  | 'on Unit Switch Out'
  | 'on Unit Take Damage'
  | 'on Unit Deal Damage'
  | 'on Unit Die'

export const AllTriggerEvents: TriggerEvent[] = [
  'on Turn Start',
  'on Turn End',
  'on Unit Enter',
  'on Unit Switch Out',
  'on Unit Take Damage',
  'on Unit Deal Damage',
  'on Unit Die',
]

export type TriggerProps<T = {}> = ModifierProps<T> & {
  modifiers?: (ctx: CombatContext) => Modifier[]
  mutations?: (ctx: CombatContext) => Mutation[]
}

export abstract class Trigger extends Modifier {
  readonly events: TriggerEvent[]
  modifiers?: (ctx: CombatContext) => Modifier[]
  mutations?: (ctx: CombatContext) => Mutation[]

  constructor(id: Id, props: TriggerProps & { events: TriggerEvent[] }) {
    super(id, props)

    this.modifiers = props.modifiers
    this.mutations = props.mutations
    this.events = props.events ?? []
  }

  resolve(unit: Unit): Partial<Unit> {
    return {}
  }

  filter(unit: Unit, ctx: CombatContext, args: MutationFilterArgs): boolean {
    return super.filter(unit, ctx, args) && unit.flags.isActive
  }
}
