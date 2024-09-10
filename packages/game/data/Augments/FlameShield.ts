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
        persistOnCombatEnd: true,
        persistOnSwitch: true,
        static: 50,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
