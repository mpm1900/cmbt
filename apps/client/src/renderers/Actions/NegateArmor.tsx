import { NegateArmorId } from '@repo/game/data'
import { MagicArmor } from '@shared/MagicArmor'
import { PhysicalArmor } from '@shared/PhysicalArmor'
import { ACTION_NAMES, ActionRenderer } from '.'

export const NegateArmorRenderer: ActionRenderer = {
  name: ACTION_NAMES[NegateArmorId],
  description: () => (
    <div>
      Removes all <PhysicalArmor /> and <MagicArmor /> from target active enemy.
    </div>
  ),
}
