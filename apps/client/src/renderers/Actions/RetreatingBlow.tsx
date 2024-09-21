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
    if (result.data?.source.flags.isBaned || !result.data?.accuracyRoll.success)
      return <></>
    return <>No available allies, attack failed.</>
  },
}
