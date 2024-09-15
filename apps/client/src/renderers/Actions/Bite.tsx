import { Bite, BiteId, Bleed } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const BiteRenderer: ActionRenderer = {
  name: ACTION_NAMES[BiteId],
  description: (a, props) => {
    const action = a as Bite
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target enemy
        unit. {action.bleedChance}% chance to apply{' '}
        <StatusInline status={Bleed} side={props?.side} />.
      </div>
    )
  },
}
