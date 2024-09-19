import { Burn, DragonBreath, DragonBreathId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const DragonBreathRenderer: ActionRenderer = {
  name: ACTION_NAMES[DragonBreathId],
  description: (action, props) => {
    const dragonbreath = action as DragonBreath
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. {dragonbreath.burnChance}% chance to apply{' '}
        <StatusInline status={Burn} side={props?.side} />.
      </div>
    )
  },
}
