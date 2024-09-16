import { Augment, Modifier, Mutation, Unit } from '../../types'
import { FirestormOnTurnEndId, InfernoId } from '../Ids'
import { AddModifiersToRegistryParentMutate } from '../Mutations'
import { CreateFirestormOnUnitEnter } from '../Triggers'

export const Inferno: Augment = {
  id: InfernoId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new CreateFirestormOnUnitEnter({
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        persistOnSwitch: true,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return [
      new AddModifiersToRegistryParentMutate({
        sourceId: unit.id,
        parentId: unit.id,
        modifierIds: [FirestormOnTurnEndId],
      }),
    ]
  },
}
