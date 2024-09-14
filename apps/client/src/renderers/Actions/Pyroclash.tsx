import { Burn, Pyroclash, PyroclashId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PyroclashRenderer: ActionRenderer = {
  name: ACTION_NAMES[PyroclashId],
  description: (action, props) => {
    const pyroclash = action as Pyroclash
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit. This
        unit takes {(pyroclash.recoilFactor * 100).toFixed()}% of damage dealt
        as recoil. {pyroclash.burnChance}% chance to apply{' '}
        <StatusInline status={Burn} side={props?.side} />.
      </div>
    )
  },
}
