import { Augment, Modifier, Mutation, Unit } from '../../types'
import { SandstormOnTurnEndId, SandStreamId } from '../Ids'
import { AddModifierRegistry } from '../Mutations'
import { CreateSandstormOnUnitEnter } from '../Triggers'

export const SandStream: Augment = {
  id: SandStreamId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new CreateSandstormOnUnitEnter({
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        persistOnCombatEnd: true,
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return [
      new AddModifierRegistry({
        sourceId: unit.id,
        parentId: unit.id,
        modifierId: SandstormOnTurnEndId,
      }),
    ]
  },
}
