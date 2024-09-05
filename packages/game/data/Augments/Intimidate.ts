import { Augment, Modifier, Mutation, Unit } from '../../types'
import { IntimidateId } from '../Ids'
import { AttackDownAllOtherOnUnitEnter } from '../Triggers'

export const Intimidate: Augment = {
  id: IntimidateId,
  name: 'Intimidate',

  modifiers(unit: Unit): Modifier[] {
    return [
      new AttackDownAllOtherOnUnitEnter({
        sourceId: unit.id,
        parentId: unit.id,
        persistOnCombatEnd: true,
        persistOnSwitch: true,
        factor: 0.25,
        duration: 0,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
