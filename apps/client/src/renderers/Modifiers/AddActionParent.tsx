import { AddActionParent, BASE_UNIT } from '@repo/game/data'
import { ActionHover } from '@shared/ActionHover'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ActionRenderers } from '../Actions'
import { ModifierName } from './_helpers'

export const AddActionParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as AddActionParent
    const action = modifier.action(BASE_UNIT)
    const renderer = ActionRenderers[action.id]
    return (
      <div>
        <div>Affected unit gains the following Actions:</div>
        <ActionHover action={action}>
          <div className="text-white font-bold pl-4">{renderer.name}</div>
        </ActionHover>
      </div>
    )
  },
}
