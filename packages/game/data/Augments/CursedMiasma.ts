import { Augment, Modifier, Mutation, Unit } from '../../types'
import { AttackDownAllId, CursedMiasmaId } from '../Ids'
import { UpdateStatAll } from '../Modifiers'
import { AddModifiersOnSelfEnter } from '../Triggers'

export const CursedMiasma: Augment = {
  id: CursedMiasmaId,
  modifiers: (unit: Unit): Modifier[] => {
    return [
      new AddModifiersOnSelfEnter({
        registryId: CursedMiasmaId,
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        persistOnSwitch: true,
        targetsLabel: 'all units',
        makeModifiers: () => [
          new UpdateStatAll({
            sourceId: unit.id,
            parentId: unit.id,
            registryId: AttackDownAllId,
            stat: 'attack',
            factor: -0.5,
          }),
        ],
      }),
    ]
  },
  mutations: (unit: Unit): Mutation[] => {
    return []
  },
}
