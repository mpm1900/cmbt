import { RapidStrike, RapidStrikeId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const RapidStrikeRenderer: ActionRenderer = {
  name: ACTION_NAMES[RapidStrikeId],
  description: (a, props) => {
    const action = a as RapidStrike
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. Usually goes first.
      </>
    )
  },
}
