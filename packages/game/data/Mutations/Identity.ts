import { CombatContext, Mutation, MutationProps, Unit } from '../../types'
import { IdentityId } from '../Ids'

export class Identity extends Mutation {
  constructor(props: MutationProps = {}) {
    super(IdentityId, props)
  }

  resolve = (unit: Unit): Partial<Unit> => unit
  filter = (unit: Unit, ctx: CombatContext): boolean => true
}
