import { Slash, SlashId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const SlashRenderer: ActionRenderer = {
  name: ACTION_NAMES[SlashId],
  description: (a, props) => {
    const action = a as Slash
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. High critical chance.
      </>
    )
  },
}
