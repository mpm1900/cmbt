import { Augment, Modifier, Mutation, Unit } from '../../types'
import { HiddenId, HiddenParentId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'

export const Hidden: Augment = {
  id: HiddenId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new UpdateFlagParent({
        registryId: HiddenParentId,
        flagKey: 'isHidden',
        value: true,
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        // This duration setting means that
        //  this augment should only be used
        //  on enemy units
        duration: 2,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
