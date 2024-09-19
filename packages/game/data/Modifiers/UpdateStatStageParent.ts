import {
  CombatContext,
  Modifier,
  MODIFIER_PRIORITIES,
  ModifierProps,
  MutationFilterArgs,
  StatKey,
  Unit,
} from '../../types'
import { clampStatStage } from '../../utils'
import { UpdateStatStageParentId } from '../Ids'

export const MAX_STAT_STAGE = 6
export const MIN_STAT_STAGE = -6

export class UpdateStatStageParent extends Modifier {
  stat?: StatKey
  stages: number

  get key(): string {
    return `${this.id}.${this.parentId}.${this.stat}`
  }

  constructor(props: ModifierProps<{ stat?: StatKey; stages?: number }>) {
    super(UpdateStatStageParentId, props)

    this.stat = props.stat
    this.stages = clampStatStage(props.stages ?? 0)
    this.priority = MODIFIER_PRIORITIES.STAGES
  }

  resolve = (unit: Unit): Partial<Unit> => {
    if (!this.stat) return unit
    return {
      stages: {
        ...unit.stages,
        [this.stat]: clampStatStage(
          (unit.stages[this.stat] ?? 0) + this.stages
        ),
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
