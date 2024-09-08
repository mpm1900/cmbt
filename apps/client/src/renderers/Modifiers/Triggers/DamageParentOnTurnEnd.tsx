import { DamageParentOnTurnEnd } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const DamageParentOnTurnEndRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as DamageParentOnTurnEnd
    const value = modifier.factor
      ? (modifier.factor * 100).toFixed(1) + '%'
      : modifier.static

    return (
      <div className="space-x-2">
        <TriggerName>On turn end:</TriggerName>
        <div>
          Unit takes{' '}
          {modifier.damageType ? (
            <DamageInline
              damage={{
                damageType: modifier.damageType,
                value,
              }}
            />
          ) : (
            <>{value} damage.</>
          )}
        </div>
      </div>
    )
  },
}
