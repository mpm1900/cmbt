import { Action, Augment, Id, Unit } from '.'

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'legendary' | 'unique'

export type Item = {
  id: Id
  rtid: Id
  name: string
  cost: number
  rarity: ItemRarity
  canSell: boolean

  action?: (unit: Unit) => Action
  augment?: Augment
  key?: Id
}

export type GroupedItem = Item & {
  count: number
}
