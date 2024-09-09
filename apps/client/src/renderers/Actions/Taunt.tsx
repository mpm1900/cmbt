import { TauntId } from '@repo/game/data'
import { ACTION_NAMES, ActionRenderer } from '.'

export const TauntRenderer: ActionRenderer = {
  name: ACTION_NAMES[TauntId],
  description: () => (
    <div>Actions that target allies now target this unit.</div>
  ),
  successLog: () => <div>Enemies have been taunted.</div>,
}
