import {
  SpeedStageDownParentId,
  SpeedStageUpParentId,
  TimeBend,
  TimeBendId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const TimeBendRenderer: ActionRenderer = {
  name: ACTION_NAMES[TimeBendId],
  description: (action, props) => {
    const timebend = action as TimeBend
    return (
      <div>
        <div>
          Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateStatStageParent({
                registryId: SpeedStageUpParentId,
                stat: 'speed',
                offset: timebend.offset,
              })
            }
          />{' '}
          to target unit, if target is an ally. Applies{' '}
          <ModifierInline
            side={props?.side}
            modifier={
              new UpdateStatStageParent({
                registryId: SpeedStageDownParentId,
                stat: 'speed',
                offset: timebend.offset * -1,
              })
            }
          />{' '}
          to target, if target is an enemy.
        </div>
      </div>
    )
  },
}
