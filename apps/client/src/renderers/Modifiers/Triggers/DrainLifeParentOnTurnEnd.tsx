import { DrainLifeParentOnTurnEnd } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const DrainLifeParentOnTurnEndRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as DrainLifeParentOnTurnEnd

    return (
      <div>
        <TriggerName>On turn end:</TriggerName>
        <div>
          Unit takes{' '}
          {modifier.damage && <DamageInline damage={modifier.damage} />} and the
          source unit heals for 100% of the damage dealt.
        </div>
      </div>
    )
  },
}
