import { PowerWordKillId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PowerWordKillRenderer: ActionRenderer = {
  name: ACTION_NAMES[PowerWordKillId],
  description: (action) => (
    <>
      Deals <DamageListInline damages={action.damages} /> to target active
      enemy. Ignores all damage negation.
    </>
  ),
  lore: () => (
    <>"Some spells are just too powerful to be allowed." -Game Developer</>
  ),
}
