import { nanoid } from 'nanoid'
import { Augment, Modifier, Mutation, Unit } from '../../types'
import { DamageAllOnTurnEnd } from '../Triggers'
import { CreateSandstormOnUnitEnter } from '../Triggers/CreateSandstormOnUnitEnter'

export const SandStreamId = nanoid()

export class SandStream extends Augment {
  constructor() {
    super(SandStreamId, 'Sand Stream')
  }
  modifiers(unit: Unit): Modifier[] {
    return [
      new CreateSandstormOnUnitEnter({
        sourceId: unit.id,
        duration: 0,
      }),
    ]
  }
  mutations(unit: Unit): Mutation[] {
    return []
  }
}
