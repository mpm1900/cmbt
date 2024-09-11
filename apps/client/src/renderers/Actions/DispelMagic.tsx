import {
  AddModifiersToRegistryAll,
  AddStatModifiersImmunityAllId,
  DispelMagic,
  DispelMagicId,
  UpdateStatAllId,
  UpdateStatParentId,
  UpdateStatStageAllId,
  UpdateStatStageParentId,
  UpdateStatStageTeamId,
  UpdateStatTeamId,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const DispelMagicRenderer: ActionRenderer = {
  name: ACTION_NAMES[DispelMagicId],
  description: (action, props) => {
    const dispelmagic = action as DispelMagic
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new AddModifiersToRegistryAll({
              registryId: AddStatModifiersImmunityAllId,
              duration: dispelmagic.duration,
              modifierIds: [
                UpdateStatAllId,
                UpdateStatParentId,
                UpdateStatStageAllId,
                UpdateStatStageParentId,
                UpdateStatStageTeamId,
                UpdateStatTeamId,
              ],
            })
          }
        />{' '}
        to all units.
      </div>
    )
  },
}
