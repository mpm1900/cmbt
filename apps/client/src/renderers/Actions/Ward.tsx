import { Ward, WardId } from '@repo/game/data'
import { MagicArmor } from '@shared/MagicArmor'
import { ACTION_NAMES, ActionRenderer } from '.'

export const WardRenderer: ActionRenderer = {
  name: ACTION_NAMES[WardId],
  description: (action) => {
    const ward = action as Ward
    return (
      <>
        This unit gains <MagicArmor>magic armor</MagicArmor> equal to{' '}
        {ward.factor * 100}% of their max mealth.
      </>
    )
  },
}
