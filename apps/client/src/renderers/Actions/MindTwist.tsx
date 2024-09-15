import {
  MagicStageDownParentId,
  MindTwist,
  MindTwistId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const MindTwistRenderer: ActionRenderer = {
  name: ACTION_NAMES[MindTwistId],
  description: (action, props) => {
    const mindtwist = action as MindTwist
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target enemy
        unit. {mindtwist.magicDownChance}% to apply{' '}
        <ModifierInline
          modifier={
            new UpdateStatStageParent({
              registryId: MagicStageDownParentId,
              stat: 'magic',
              stages: mindtwist.magicStage,
            })
          }
        />
        .
      </div>
    )
  },
}
