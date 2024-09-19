import {
  AddModifiersToRegistryAll,
  AddStatModifiersImmunityAllId,
  DispelMagic,
  DispelMagicId,
  UpdateStatAll,
  UpdateStatParent,
  UpdateStatStageParent,
  UpdateStatTeam,
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
              modifiers: [
                new UpdateStatAll({}),
                new UpdateStatParent({}),
                new UpdateStatStageParent({}),
                // UpdateStatStageTeamId,
                new UpdateStatTeam({ teamId: '' }),
              ],
            })
          }
        />{' '}
        to all units.
      </div>
    )
  },
}
