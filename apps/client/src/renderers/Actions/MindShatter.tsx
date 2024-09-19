import {
  MagicStageDownParentId,
  MindShatter,
  MindShatterId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const MindShatterRenderer: ActionRenderer = {
  name: ACTION_NAMES[MindShatterId],
  description: (a, props) => {
    const action = a as MindShatter
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. Applies{' '}
        <ModifierInline
          modifier={
            new UpdateStatStageParent({
              registryId: MagicStageDownParentId,
              stat: 'magic',
              stages: action.magicDownStages,
            })
          }
        />{' '}
        to this unit.
      </div>
    )
  },
}
