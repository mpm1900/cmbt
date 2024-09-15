import { nanoid } from 'nanoid'
import { Item } from '../../types'
import { FireDamageUpParentId } from '../Ids'
import { UpdateStatParent } from '../Modifiers'
import { Hellknight } from '../UnitBases/Hellknight'

export const RubyId = nanoid()
export const RubyAugmentId = nanoid()
export const Ruby = (): Item => {
  const rtid = nanoid()
  return {
    id: RubyId,
    rtid,
    name: 'Ruby',
    cost: 1000,
    rarity: 'rare',
    augment: {
      id: RubyAugmentId,
      itemRtid: rtid,
      unitBaseIds: [Hellknight.id],
      cost: 1,
      modifiers: (u) => [
        new UpdateStatParent({
          registryId: FireDamageUpParentId,
          stat: 'fireExpansion',
          percentage: true,
          sourceId: u.id,
          parentId: u.id,
          static: 20,
        }),
      ],
      mutations: () => [],
    },
  }
}
