import {
  CombatContext,
  Modifier,
  MODIFIER_PRIORITIES,
  ModifierProps,
  MutationFilterArgs,
  StatKey,
  Unit,
} from '../../types'
import { UpdateStatStageParentId } from '../Ids'

export class UpdateStatStageParent extends Modifier {
  stat: StatKey
  stages: number

  get key(): string {
    return `${this.id}.${this.parentId}.${this.stat}`
  }

  constructor(props: ModifierProps<{ stat: StatKey; stages: number }>) {
    super(UpdateStatStageParentId, props)

    this.stat = props.stat
    this.stages = Math.min(Math.max(props.stages, -4), 4)
    this.priority = MODIFIER_PRIORITIES.STAGES
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stages: {
        ...unit.stages,
        [this.stat]: (unit.stages[this.stat] ?? 0) + this.stages,
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
