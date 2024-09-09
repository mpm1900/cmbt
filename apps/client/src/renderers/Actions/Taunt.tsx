import { TauntId } from '@repo/game/data'
import { ACTION_NAMES, ActionRenderer } from '.'

export const TauntRenderer: ActionRenderer = {
  name: ACTION_NAMES[TauntId],
  description: () => (
    <div>
      Single-target actions that would target allied units this turn target this
      unit instead.
    </div>
  ),
  successLog: (result) => (
    <div>Enemies have been taunted by {result.source?.name}.</div>
  ),
}
