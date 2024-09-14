import {
  MagicStageDownParentId,
  MindShatter,
  MindShatterId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const MindShatterRenderer: ActionRenderer = {
  name: ACTION_NAMES[MindShatterId],
  description: (a, props) => {
    const action = a as MindShatter
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit.{' '}
        Applies{' '}
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
