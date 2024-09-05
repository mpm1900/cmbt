import { Augment, Modifier, Mutation, Unit } from '../../types'
import { SandstormOnTurnEndId, SandStreamId } from '../Ids'
import { AddModifierRegistry } from '../Mutations'
import { CreateSandstormOnUnitEnter } from '../Triggers'

export const SandStream: Augment = {
  id: SandStreamId,
  name: 'Sand Stream',
  modifiers(unit: Unit): Modifier[] {
    return [
      new CreateSandstormOnUnitEnter({
        sourceId: unit.id,
        parentId: unit.id,
        persistOnCombatEnd: true,
        persistOnSwitch: true,
        duration: 0,
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
