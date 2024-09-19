import {
  CombatContext,
  Id,
  Modifier,
  MODIFIER_PRIORITIES,
  ModifierProps,
  MutationFilterArgs,
  StatKey,
  Unit,
} from '../../types'
import { clampStatStage, getTeamIdValue } from '../../utils'
import { UpdateStatStageTeamId } from '../Ids'

export class UpdateStatStageTeam extends Modifier {
  teamId?: Id
  notTeamId?: Id
  stat?: StatKey
  stages: number

  get key(): string {
    return `${this.id}.${this.parentId}.${this.stat}`
  }

  constructor(
    props: ModifierProps<{
      teamId: Id
      notTeamId?: Id
      stat?: StatKey
      stages?: number
    }>
  ) {
    super(UpdateStatStageTeamId, props)

    this.teamId = props.teamId
    this.notTeamId = props.notTeamId
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
    return (
      super.filter(unit, ctx, args) &&
      getTeamIdValue(unit.teamId, this.teamId, this.notTeamId)
    )
  }
}
