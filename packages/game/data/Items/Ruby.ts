import { nanoid } from 'nanoid'
import { Item } from '../../types'
import { FireDamageUpParent } from '../Modifiers'

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
      modifiers: (u) => [
        new FireDamageUpParent({
          sourceId: u.id,
          parentId: u.id,
          static: 0.2,
        }),
      ],
      mutations: () => [],
    },
  }
}
