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
  uses?: number
  modifiers?: (ctx: CombatContext, args: MutationFilterArgs) => Modifier[]
  mutations?: (ctx: CombatContext, args: MutationFilterArgs) => Mutation[]
}

export abstract class Trigger extends Modifier {
  readonly events: TriggerEvent[]
  uses?: number
  modifiers?: (ctx: CombatContext, args: MutationFilterArgs) => Modifier[]
  mutations?: (ctx: CombatContext, args: MutationFilterArgs) => Mutation[]

  constructor(id: Id, props: TriggerProps & { events: TriggerEvent[] }) {
    super(id, props)

    this.uses = props.uses
    this.modifiers = props.modifiers
    this.mutations = props.mutations
    this.events = props.events ?? []
  }

  resolve(unit: Unit): Partial<Unit> {
    return unit
  }

  filter(unit: Unit, ctx: CombatContext, args: MutationFilterArgs): boolean {
    return super.filter(unit, ctx, args) && unit.flags.isActive
  }

  decrementUses() {
    if (this.uses !== undefined) {
      this.uses -= 1
    }
    return this
  }

  public static OnSelfEnter(
    trigger: Trigger,
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ) {
    const newUnits = args.units
    return (
      !!newUnits?.some((u) => u.id === trigger.sourceId) &&
      unit.id === trigger.sourceId
    )
  }
}
