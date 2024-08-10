import { nanoid } from 'nanoid'
import { Augment, Modifier, Mutation, Unit } from '../../types'
import { CreateSandstormOnUnitEnter, SandstormOnTurnEndId } from '../Triggers'
import { AddModifierRegistry } from '../Mutations'

export const SandStreamId = nanoid()

export class SandStream extends Augment {
  constructor() {
    super(SandStreamId, 'Sand Stream')
  }
  modifiers(unit: Unit): Modifier[] {
    return [
      new CreateSandstormOnUnitEnter({
        duration: 0,
        sourceId: unit.id,
        parentId: unit.id,
      }),
    ]
  }
  mutations(unit: Unit): Mutation[] {
    return [
      new AddModifierRegistry({
        sourceId: unit.id,
        parentId: unit.id,
        modifierId: SandstormOnTurnEndId,
      }),
    ]
  }
}
