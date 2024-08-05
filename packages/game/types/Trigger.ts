import { nanoid } from 'nanoid'
import { Modifier, ModifierProps } from './Modifier'
import { CombatContext, Id } from '.'

export type TriggerEvent = 'on Turn Start' | 'on Turn End' | 'on Unit Enter'
export const AllTriggerEvents: TriggerEvent[] = ['on Turn Start', 'on Turn End']

export const TriggerId = () => `Trigger@${nanoid()}`

export type TriggerProps<T = {}> = ModifierProps<T> & {
  modifiers?: (ctx: CombatContext) => Modifier[]
}

export abstract class Trigger extends Modifier {
  readonly events: TriggerEvent[]
  modifiers?: (ctx: CombatContext) => Modifier[]

  constructor(id: Id, props: TriggerProps & { events: TriggerEvent[] }) {
    super(id, props)

    this.modifiers = props.modifiers
    this.events = props.events ?? []
  }
}
