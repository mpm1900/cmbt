import { Fireball, FireballId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const FireballRenderer: ActionRenderer = {
  name: ACTION_NAMES[FireballId],
  description: (action) => {
    const fireball = action as Fireball
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. Deals <DamageListInline damages={[fireball.splashDamage]} /> to
        all other active enemies.
      </>
    )
  },
}
