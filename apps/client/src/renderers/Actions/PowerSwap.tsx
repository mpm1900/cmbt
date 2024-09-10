import { PowerSwapId } from '@repo/game/data'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PowerSwapRenderer: ActionRenderer = {
  name: ACTION_NAMES[PowerSwapId],
  description: (action, props) => {
    return (
      <>
        This unit is swtiched with target allied unit. All staged stat modifiers
        are transfered from this unit to the new active unit.
      </>
    )
  },
}
