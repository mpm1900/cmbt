import { Block, BlockId } from '@repo/game/data'
import { PhysicalArmor } from '@shared/PhysicalArmor'
import { ACTION_NAMES, ActionRenderer } from '.'

export const BlockRenderer: ActionRenderer = {
  name: ACTION_NAMES[BlockId],
  description: (a) => {
    const action = a as Block
    return (
      <>
        This unit gains <PhysicalArmor>physical armor</PhysicalArmor> equal to{' '}
        {action.factor * 100}% of their max mealth.
      </>
    )
  },
}
