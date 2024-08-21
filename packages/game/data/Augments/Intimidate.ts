import { Augment, Modifier, Mutation, Unit } from '../../types'
import { IntimidateId } from '../Ids'
import { PowerDownAllOtherOnUnitEnter } from '../Triggers'

export const Intimidate: Augment = {
  id: IntimidateId,
  name: 'Intimidate',

  modifiers(unit: Unit): Modifier[] {
    return [
      new PowerDownAllOtherOnUnitEnter({
        sourceId: unit.id,
        parentId: unit.id,
        factor: 1.5,
        duration: 0,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
