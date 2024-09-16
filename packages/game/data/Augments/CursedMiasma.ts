import { Augment, Modifier, Mutation, Unit } from '../../types'
import { CursedMiasmaId } from '../Ids'
import { StatDownStaticAllOnUnitEnter } from '../Triggers'

export const CursedMiasma: Augment = {
  id: CursedMiasmaId,
  modifiers: (unit: Unit): Modifier[] => {
    return [
      new StatDownStaticAllOnUnitEnter({
        registryId: CursedMiasmaId,
        sourceId: unit.id,
        parentId: unit.id,
        stat: 'attack',
        factor: -0.5,
      }),
    ]
  },
  mutations: (unit: Unit): Mutation[] => {
    return []
  },
}
