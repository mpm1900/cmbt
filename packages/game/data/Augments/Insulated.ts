import { Augment, Modifier, Mutation, Unit } from '../../types'
import { FireNegationUpParentId, InsulatedId } from '../Ids'
import { UpdateStatParent } from '../Modifiers'

export const Insulated: Augment = {
  id: InsulatedId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new UpdateStatParent({
        registryId: FireNegationUpParentId,
        stat: 'fireNegation',
        percentage: true,
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        static: 50,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
