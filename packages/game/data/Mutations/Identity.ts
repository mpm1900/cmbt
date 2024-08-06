import { CombatContext, Mutation, MutationProps, Unit } from '../../types'
import { MutationId } from '../Ids'

export const IdentityId = MutationId()

export class Identity extends Mutation {
  constructor(props: MutationProps = {}) {
    super(IdentityId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => unit
  filter = (unit: Unit, ctx: CombatContext): boolean =>
    unit.id === this.sourceId
}
