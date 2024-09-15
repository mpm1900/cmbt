import { Charged, LightningBolt, LightningBoltId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const LightningBoltRenderer: ActionRenderer = {
  name: ACTION_NAMES[LightningBoltId],
  description: (action, props) => {
    const lightningbolt = action as LightningBolt
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit.{' '}
        {lightningbolt.chargeChance}% chance to apply{' '}
        <StatusInline side={props?.side} status={Charged} /> to this unit.
      </div>
    )
  },
}
