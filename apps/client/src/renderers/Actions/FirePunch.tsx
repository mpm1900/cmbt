import { Burn, FirePunch, FirePunchId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const FirePunchRenderer: ActionRenderer = {
  name: ACTION_NAMES[FirePunchId],
  description: (action, props) => {
    const firepunch = action as FirePunch
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. {firepunch.burnChance}% chance to apply{' '}
        <StatusInline status={Burn} side={props?.side} />.
      </div>
    )
  },
}
