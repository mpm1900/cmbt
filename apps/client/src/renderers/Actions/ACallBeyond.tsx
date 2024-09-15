import {
  ACallBeyond,
  ACallBeyondId,
  MagicStageDownParentId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const ACallBeyondRenderer: ActionRenderer = {
  name: ACTION_NAMES[ACallBeyondId],
  description: (a, props) => {
    const action = a as ACallBeyond
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target enemy
        unit. Applies{' '}
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
