import { Augment, Modifier, Mutation, Unit } from '../../types'
import { DraconicAuraId } from '../Ids'
import { UpdateStatStageAllOtherOnUnitEnter } from '../Triggers'

export const DraconicAura: Augment = {
  id: DraconicAuraId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new UpdateStatStageAllOtherOnUnitEnter({
        registryId: DraconicAuraId,
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        stat: 'attack',
        stages: -1,
        persistOnSwitch: true,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
