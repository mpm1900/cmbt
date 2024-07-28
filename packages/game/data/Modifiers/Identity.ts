import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const IdentityId = ModifierId()

export class Identity extends Modifier {
  constructor(props: ModifierProps) {
    super(IdentityId, props)
  }

  fn = (unit: Unit): Partial<Unit> => unit
  filter = (unit: Unit, ctx: GameContext): boolean => unit.id === this.sourceId
}
