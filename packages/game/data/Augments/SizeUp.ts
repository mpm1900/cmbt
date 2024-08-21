import { nanoid } from 'nanoid'
import { Augment, Modifier, Mutation, Unit } from '../../types'
import { InspectAllOnUnitEnter } from '../Triggers/InspectAllOnUnitEnter'

export const SizeUpId = nanoid()
export const SizeUp: Augment = {
  id: SizeUpId,
  name: 'Size Up',

  modifiers(unit: Unit): Modifier[] {
    return [
      new InspectAllOnUnitEnter({
        sourceId: unit.id,
        parentId: unit.id,
        duration: 0,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
