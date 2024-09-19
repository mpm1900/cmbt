import {
  SpeedUpTeamId,
  UpdateStatTeam,
  WindWalk,
  WindWalkId,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const WindWalkRenderer: ActionRenderer = {
  name: ACTION_NAMES[WindWalkId],
  description: (a, props) => {
    const action = a as WindWalk
    return (
      <>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatTeam({
              registryId: SpeedUpTeamId,
              teamId: action.teamId,
              sourceId: action.sourceId,
              duration: action.duration,
              factor: action.speedUpFactor,
              stat: 'speed',
            })
          }
        />{' '}
        to this unit's team.
      </>
    )
  },
}
