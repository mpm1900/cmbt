import { Augment, Modifier, Mutation, Unit } from '../../types'
import { ScholarId } from '../Ids'
import { InspectAllOnUnitEnter } from '../Triggers'

export const Scholar: Augment = {
  id: ScholarId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new InspectAllOnUnitEnter({
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        persistOnCombatEnd: true,
        persistOnSwitch: true,
        duration: 0,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
