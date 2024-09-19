import { Augment, Modifier, Mutation, Unit } from '../../types'
import { HiddenParentId, TallGrassId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'

export const TallGrass: Augment = {
  id: TallGrassId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new UpdateFlagParent({
        registryId: HiddenParentId,
        flag: 'isHidden',
        value: true,
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        duration: 2,
        persistOnSwitch: true,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
