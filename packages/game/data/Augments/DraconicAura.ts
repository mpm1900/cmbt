import { Augment, Modifier, Mutation, Unit } from '../../types'
import { DraconicAuraId } from '../Ids'
import { AttackDownAllOtherOnUnitEnter } from '../Triggers'

export const DraconicAura: Augment = {
  id: DraconicAuraId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new AttackDownAllOtherOnUnitEnter({
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        offset: -1,
        persistOnCombatEnd: true,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
