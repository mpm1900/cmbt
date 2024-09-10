import { nanoid } from 'nanoid'
import {
  CombatContext,
  Modifier,
  MODIFIER_PRIORITIES,
  ModifierProps,
  MutationFilterArgs,
  StatKey,
  Unit,
} from '../../../types'
import { mapStageToMultiplier } from '../../../utils'

const ApplyStatStagesId = nanoid()
export class ApplyStatStages extends Modifier {
  constructor(props: ModifierProps) {
    super(ApplyStatStagesId, props)
    this.priority = MODIFIER_PRIORITIES.APPLY_STAGES
    this.maxInstances = 1
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) =>
        Object.fromEntries(
          Object.entries(stats).map(([key, value]) => {
            const stage = unit.stages[key as StatKey] ?? 0
            return [key, value * mapStageToMultiplier(stage)]
          })
        )
      ),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return unit.id === this.parentId
  }
}
