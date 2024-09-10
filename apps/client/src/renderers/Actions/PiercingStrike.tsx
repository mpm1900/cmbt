import {
  DefenseStageDownParentId,
  PiercingStrike,
  PiercingStrikeId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PiercingStrikeRenderer: ActionRenderer = {
  name: ACTION_NAMES[PiercingStrikeId],
  description: (action, props) => {
    const piercingstrike = action as PiercingStrike
    return (
      <div>
        Deals <DamageInline damage={piercingstrike.damage} /> to target enemy
        unit. {piercingstrike.defenseDownChance}% chance to apply{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatStageParent({
              registryId: DefenseStageDownParentId,
              stat: 'defense',
              offset: piercingstrike.defenseStage,
            })
          }
        />
        .
      </div>
    )
  },
}
