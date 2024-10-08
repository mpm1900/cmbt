import { Guidance, GuidingRay, GuidingRayId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const GuidingrayRenderer: ActionRenderer = {
  name: ACTION_NAMES[GuidingRayId],
  description: (a, props) => {
    const action = a as GuidingRay
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target unit, if
        the target is an enemy. Applies{' '}
        <StatusInline status={Guidance} side={props?.side} /> to target unit, if
        the target is an ally.
      </div>
    )
  },
}
