import { GuidingRay, GuidingRayId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'
import { Guidance } from '../../../../../packages/game/data/Statuses/Guidance'

export const GuidingrayRenderer: ActionRenderer = {
  name: ACTION_NAMES[GuidingRayId],
  description: (a, props) => {
    const action = a as GuidingRay
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target unit, if the
        target is an enemy. Applies{' '}
        <StatusInline status={Guidance} side={props?.side} /> to target unit, if
        the target is an ally.
      </div>
    )
  },
}
