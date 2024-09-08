import { Augment, Modifier, Mutation, Unit } from '../../types'
import { RegenerationId } from '../Ids'
import { HealParentOnUnitSwitch } from '../Triggers'

export const Regeneration: Augment = {
  id: RegenerationId,
  name: 'Regeneration',

  modifiers(unit: Unit): Modifier[] {
    return [
      new HealParentOnUnitSwitch({
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        persistOnCombatEnd: true,
        persistOnSwitch: true,
        factor: 0.3,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
