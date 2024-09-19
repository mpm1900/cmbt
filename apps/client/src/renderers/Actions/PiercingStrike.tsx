import {
  DefenseStageDownParentId,
  PiercingStrike,
  PiercingStrikeId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PiercingStrikeRenderer: ActionRenderer = {
  name: ACTION_NAMES[PiercingStrikeId],
  description: (action, props) => {
    const piercingstrike = action as PiercingStrike
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to active target
        enemy. {piercingstrike.defenseDownChance}% chance to apply{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatStageParent({
              registryId: DefenseStageDownParentId,
              stat: 'defense',
              stages: piercingstrike.defenseStage,
            })
          }
        />
        .
      </div>
    )
  },
}
