import {
  GameContext,
  Mutation,
  MutationId,
  MutationProps,
  Unit,
} from '../../../types'

export const SetIsActiveParentId = MutationId()

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

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return unit.id === this.parentId
  }
}
