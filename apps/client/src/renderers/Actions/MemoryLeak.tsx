import { DisabledParent, MemoryLeak, MemoryLeakId } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const MemoryLeakRenderer: ActionRenderer = {
  name: ACTION_NAMES[MemoryLeakId],
  description: (a, props) => {
    const action = a as MemoryLeak
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new DisabledParent({
              duration: action.duration,
            })
          }
        />{' '}
        to target active enemy.
      </div>
    )
  },
}
