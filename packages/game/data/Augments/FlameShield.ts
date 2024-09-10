import { Augment, Modifier, Mutation, Unit } from '../../types'
import { FireNegationUpParentId, FlameShieldId } from '../Ids'
import { UpdateStatParent } from '../Modifiers'

export const FlameShield: Augment = {
  id: FlameShieldId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new UpdateStatParent({
        registryId: FireNegationUpParentId,
        stat: 'fireNegation',
        percentage: true,
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        static: 50,
        persistOnCombatEnd: true,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
