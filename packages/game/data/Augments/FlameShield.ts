import { Augment, Modifier, Mutation, Unit } from '../../types'
import { FlameShieldId } from '../Ids'
import { FireNegationUpParent } from '../Modifiers/FireNegationUpParent'

export const FlameShield: Augment = {
  id: FlameShieldId,
  name: 'Flame Shield',

  modifiers(unit: Unit): Modifier[] {
    return [
      new FireNegationUpParent({
        sourceId: unit.id,
        parentId: unit.id,
        offset: 0.5,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
