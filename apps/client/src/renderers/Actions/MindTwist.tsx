import {
  MagicStageDownParentId,
  MindTwist,
  MindTwistId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const MindShatterRenderer: ActionRenderer = {
  name: ACTION_NAMES[MindTwistId],
  description: (action, props) => {
    const mindtwist = action as MindTwist
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit.{' '}
        {mindtwist.magicDownChance}% to apply{' '}
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
