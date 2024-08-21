import { Augment, Modifier, Mutation, Unit } from '../../types'
import { SizeUpId } from '../Ids'
import { InspectAllOnUnitEnter } from '../Triggers'

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
