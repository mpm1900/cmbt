import {
  CombatContext,
  Modifier,
  ModifierProps,
  MutationFilterArgs,
  StatKey,
  Unit,
} from '../../types'
import { UpdateStatStageParentId } from '../Ids'

export class UpdateStatStageParent extends Modifier {
  stat: StatKey
  offset: number

  get key(): string {
    return `${this.id}.${this.parentId}${this.stat}`
  }

  constructor(props: ModifierProps<{ stat: StatKey; offset: number }>) {
    super(UpdateStatStageParentId, props)

    this.stat = props.stat
    this.offset = props.offset
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stages: {
        ...unit.stages,
        [this.stat]: (unit.stages[this.stat] ?? 0) + this.offset,
      },
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
