import { nanoid } from 'nanoid'
import { Augment, Modifier, Mutation, Unit } from '../../types'
import { CreateSandstormOnUnitEnter } from '../Triggers'

export const SandStreamId = nanoid()

export class SandStream extends Augment {
  constructor() {
    super(SandStreamId, 'Sand Stream')
  }
  modifiers(unit: Unit): Modifier[] {
    return [
      new CreateSandstormOnUnitEnter({
        duration: 0,
      }),
    ]
  }
  mutations(unit: Unit): Mutation[] {
    return []
  }
}
