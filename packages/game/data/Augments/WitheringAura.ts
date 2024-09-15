import { Augment, Modifier, Mutation, Unit } from '../../types'
import { WitheringAuraId } from '../Ids'
import { StatDownStaticAllOnUnitEnter } from '../Triggers'

export const WitheringAura: Augment = {
  id: WitheringAuraId,
  modifiers: (unit: Unit): Modifier[] => {
    return [
      new StatDownStaticAllOnUnitEnter({
        registryId: WitheringAuraId,
        sourceId: unit.id,
        parentId: unit.id,
        stat: 'attack',
        factor: -0.5,
        persistOnCombatEnd: true,
      }),
    ]
  },
  mutations: (unit: Unit): Mutation[] => {
    return []
  },
}
