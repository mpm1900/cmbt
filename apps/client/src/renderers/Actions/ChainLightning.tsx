import { ChainLightning, ChainLightningId, Charged } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const ChainLightningRenderer: ActionRenderer = {
  name: ACTION_NAMES[ChainLightningId],
  description: (a, props) => {
    const action = a as ChainLightning
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. Then, {action.chainChances[0]}% chance to deal{' '}
        <DamageListInline damages={[action.chainDamages[0]]} /> to another
        random active enemy. Then, {action.chainChances[1]}% chance to deal{' '}
        <DamageListInline damages={[action.chainDamages[1]]} /> to another
        random active enemy. {action.chargeChance}% chance to apply{' '}
        <StatusInline side={props?.side} status={Charged} /> to this unit.
      </>
    )
  },
}
