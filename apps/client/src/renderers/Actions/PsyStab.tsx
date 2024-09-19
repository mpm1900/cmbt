import { PsyStab, PsyStabId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PsyStabRenderer: ActionRenderer = {
  name: ACTION_NAMES[PsyStabId],
  description: (a, props) => {
    const action = a as PsyStab
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. Usually goes first.
      </>
    )
  },
}
