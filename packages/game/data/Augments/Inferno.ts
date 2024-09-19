import { Augment, Modifier, Mutation, Unit } from '../../types'
import { FirestormOnTurnEndId, InfernoId } from '../Ids'
import { AddModifiersToRegistryParentMutate } from '../Mutations'
import { AddModifiersOnSelfEnter, DamageAllOnTurnEnd } from '../Triggers'

export const Inferno: Augment = {
  id: InfernoId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new AddModifiersOnSelfEnter({
        registryId: InfernoId,
        sourceId: unit.id,
        parentId: unit.id,
        persistOnSwitch: true,
        targetsLabel: 'the battlefield',
        modifiersToAdd: [
          new DamageAllOnTurnEnd({
            sourceId: unit.id,
            registryId: FirestormOnTurnEndId,
            damage: {
              factor: 0.1,
              attackType: 'magic',
              damageType: 'fire',
            },
            duration: 5,
            maxInstances: 1,
          }),
        ],
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
