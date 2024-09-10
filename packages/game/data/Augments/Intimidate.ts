import { Augment, Modifier, Mutation, Unit } from '../../types'
import { IntimidateId } from '../Ids'
import { AttackDownAllOtherOnUnitEnter } from '../Triggers'

export const Intimidate: Augment = {
  id: IntimidateId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new AttackDownAllOtherOnUnitEnter({
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        offset: -1,
        duration: 0,
        persistOnCombatEnd: true,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
