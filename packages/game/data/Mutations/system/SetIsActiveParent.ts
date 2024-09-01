import { CombatContext, Mutation, MutationProps, Unit } from '../../../types'
import { SetIsActiveParentId } from '../../Ids'

export class SetIsActiveParent extends Mutation {
  readonly isActive: boolean

  constructor(props: MutationProps<{ isActive: boolean }>) {
    super(SetIsActiveParentId, props)
    this.isActive = props.isActive
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      flags: Mutation.setFlags(unit, (flags) => ({
        isActive: this.isActive,
      })),
      metadata: {
        ...unit.metadata,
        hasBeenSeen: this.isActive ?? unit.metadata.hasBeenSeen,
      },
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return unit.id === this.parentId
  }
}
