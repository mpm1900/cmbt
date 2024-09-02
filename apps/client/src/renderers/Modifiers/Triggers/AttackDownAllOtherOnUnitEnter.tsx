import { AttackDownParent } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const AttackDownAllOtherOnUnitEnterRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as AttackDownParent
    return (
      <div className="space-x-2">
        <TriggerName>On self enter:</TriggerName>
        <span>
          Applies{' '}
          <ModifierInline
            modifier={
              new AttackDownParent({
                factor: modifier.factor,
              })
            }
          />{' '}
          to all other active units.
        </span>
      </div>
    )
  },
}
