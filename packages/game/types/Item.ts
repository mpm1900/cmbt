import { nanoid } from 'nanoid'
import { Action, ActionProps, Id } from '.'

export const ItemId = () => `Item@${nanoid()}`

export type ItemProps = ActionProps & { count: number }

export abstract class Item extends Action {
  count: number

  constructor(id: Id, props: ItemProps) {
    super(id, props)
    this.count = props.count
  }

  decrementCount() {
    this.count -= 1
    return this
  }
}
