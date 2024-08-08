import { nanoid } from 'nanoid'
import { Augment, Modifier, Mutation, Unit } from '../../types'
import { PowerDownAllOtherOnUnitEnter } from '../Triggers'

export const IntimidateId = nanoid()

export class Intimidate extends Augment {
  constructor() {
    super(IntimidateId, 'Intimidate')
  }
  modifiers(unit: Unit): Modifier[] {
    return [
      new PowerDownAllOtherOnUnitEnter({
        sourceId: unit.id,
        coef: 1.5,
        duration: 0,
      }),
    ]
  }
  mutations(unit: Unit): Mutation[] {
    return []
  }
}
