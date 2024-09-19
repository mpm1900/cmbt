import { AddModifiersOnSelfEnter } from '@repo/game/data'
import { ModifierListInline } from '@shared/ModifierListInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const AddModifiersOnSelfEnterRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as AddModifiersOnSelfEnter
    return (
      <div>
        <TriggerName>On self enter:</TriggerName>
        <span>
          Applies{' '}
          <ModifierListInline modifiers={modifier.makeModifiers(undefined)} />
          to {modifier.targetsLabel}.
        </span>
      </div>
    )
  },
}
