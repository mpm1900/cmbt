import { nanoid } from 'nanoid'
import { Item } from '../../types'

export const RubyId = nanoid()
export const RubyAugmentId = nanoid()
export const Ruby = (): Item => {
  const rtid = nanoid()
  return {
    id: RubyId,
    rtid,
    name: 'Ruby',
    cost: 1000,
    augment: {
      id: RubyAugmentId,
      itemRtid: rtid,
      name: 'Ruby',
      cost: 1,
      modifiers: () => [],
      mutations: () => [],
    },
  }
}
