import { RetreatingBlowId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const RetreatingBlowRenderer: ActionRenderer = {
  name: ACTION_NAMES[RetreatingBlowId],
  description: (action, props) => {
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. This unit switches out after attacking.
      </div>
    )
  },
  failureLog: (result) => {
    return <>Cannot retreat. Attack failed.</>
  },
}
