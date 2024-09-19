import {
  AddModifiersToRegistryAll,
  AddModifiersToRegistryStaticAllOnUnitEnter,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const AddModifiersToRegistryStaticAllOnUnitEnterRenderer: ModifierRenderer =
  {
    name: (mod) => (
      <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>
    ),
    description: (mod) => {
      const modifier = mod as AddModifiersToRegistryStaticAllOnUnitEnter
      return (
        <div>
          <TriggerName>On self enter:</TriggerName>
          <span>
            Applies{' '}
            <ModifierInline
              modifier={
                new AddModifiersToRegistryAll({
                  registryId: modifier.registryId,
                  sourceId: modifier.sourceId,
                  parentId: modifier.parentId,
                  modifiers: modifier.mods,
                })
              }
            />{' '}
            to the battlefield.
          </span>
        </div>
      )
    },
  }
