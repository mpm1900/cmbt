import { Burn, GhostFlame, GhostFlameId } from '@repo/game/data'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const GhostFlameRenderer: ActionRenderer = {
  name: ACTION_NAMES[GhostFlameId],
  cost: () => '20 FP',
  costAlt: <span className="text-blue-300">20 FP</span>,
  description: (action, props) => {
    const ghostflame = action as GhostFlame
    return (
      <div>
        Applies <StatusInline status={Burn} side={props?.side} /> to target
        active enemy.
      </div>
    )
  },
  lore: () => (
    <>
      The user shoots a sinister, bluish-white flame at the target. Said to
      harbor the power of death.
    </>
  ),
}
