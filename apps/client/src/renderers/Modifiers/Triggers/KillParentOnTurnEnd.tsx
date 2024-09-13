import { KillParentOnTurnEnd } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const KillParentOnTurnEndRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as KillParentOnTurnEnd
    const delay = modifier.delay ?? 0
    return (
      <div>
        <TriggerName>On turn end:</TriggerName>
        <span>
          This unit dies {delay >= 2 && `in ${delay} turns`}
          {delay < 2 && (delay === 0 ? 'this turn' : 'next turn')}
        </span>
      </div>
    )
  },
}
