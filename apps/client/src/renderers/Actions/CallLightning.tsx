import { CallLightning, CallLightningId, Charged } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const CallLightningRenderer: ActionRenderer = {
  name: ACTION_NAMES[CallLightningId],
  description: (a, props) => {
    const action = a as CallLightning
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. {action.chargeChance}% chance to apply{' '}
        <StatusInline side={props?.side} status={Charged} /> to this unit.
      </div>
    )
  },
}
