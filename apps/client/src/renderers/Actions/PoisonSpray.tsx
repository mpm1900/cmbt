import { Poison, PoisonSpray, PoisonSprayId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PoisonSprayRenderer: ActionRenderer = {
  name: ACTION_NAMES[PoisonSprayId],
  description: (a, props) => {
    const action = a as PoisonSpray
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy and applies <StatusInline side={props?.side} status={Poison} />.
      </>
    )
  },
}
