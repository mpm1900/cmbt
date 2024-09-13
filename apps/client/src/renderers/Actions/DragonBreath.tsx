import { Burn, DragonBreath, DragonBreathId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const DragonBreathRenderer: ActionRenderer = {
  name: ACTION_NAMES[DragonBreathId],
  description: (action, props) => {
    const dragonbreath = action as DragonBreath
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit.{' '}
        {dragonbreath.burnChance}% chance to apply{' '}
        <StatusInline status={Burn} side={props?.side} />.
      </div>
    )
  },
}
