import { Bite, BiteId, Bleed } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const BiteRenderer: ActionRenderer = {
  name: ACTION_NAMES[BiteId],
  baseDamage: (action) => `${action.damage?.power}`,
  description: (action, props) => {
    const bite = action as Bite
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit.{' '}
        {bite.bleedChance}% chance to apply{' '}
        <StatusInline status={Bleed} side={props?.side} />.
      </div>
    )
  },
}
