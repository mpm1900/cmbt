import { Augment, Modifier, Mutation, Unit } from '../../types'
import { RegenerationId } from '../Ids'
import { HealParentOnUnitSwitch } from '../Triggers'

export const Regeneration: Augment = {
  id: RegenerationId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new HealParentOnUnitSwitch({
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        factor: 0.3,
        persistOnSwitch: true,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
