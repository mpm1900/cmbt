import { Charged, LightningBolt, LightningBoltId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const LightningBoltRenderer: ActionRenderer = {
  name: ACTION_NAMES[LightningBoltId],
  description: (action, props) => {
    const lightningbolt = action as LightningBolt
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target enemy
        unit. {lightningbolt.chargeChance}% chance to apply{' '}
        <StatusInline side={props?.side} status={Charged} /> to this unit.
      </div>
    )
  },
}
