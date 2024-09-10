import { Augment, Modifier, Mutation, Unit } from '../../types'
import { HiddenId, HiddenParentId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'

export const Hidden: Augment = {
  id: HiddenId,
  name: 'Hidden',

  modifiers(unit: Unit): Modifier[] {
    return [
      new UpdateFlagParent({
        registryId: HiddenParentId,
        flagKey: 'isHidden',
        value: true,
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        persistOnCombatEnd: true,
        persistOnSwitch: true,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
