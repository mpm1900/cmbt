import { ArmorUp, ArmorUpId } from '@repo/game/data'
import { PhysicalArmor } from '@shared/PhysicalArmor'
import { ACTION_NAMES, ActionRenderer } from '.'

export const ArmorUpRenderer: ActionRenderer = {
  name: ACTION_NAMES[ArmorUpId],
  description: (action) => {
    const armorup = action as ArmorUp
    return (
      <div>
        This unit gains <PhysicalArmor>{armorup.amount}</PhysicalArmor>
      </div>
    )
  },
}
