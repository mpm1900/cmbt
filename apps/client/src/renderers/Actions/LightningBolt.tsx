import {
  LightningBolt,
  LightningBoltId,
  Stasis,
  StunnedParentId,
  UpdateFlagParent,
} from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ModifierInline } from '@shared/ModifierInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const LightningBoltRenderer: ActionRenderer = {
  name: ACTION_NAMES[LightningBoltId],
  description: (action, props) => {
    const lightningbolt = action as LightningBolt
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit.{' '}
        {lightningbolt.stasisChance}% chance to apply{' '}
        <StatusInline side={props?.side} status={Stasis} /> and{' '}
        <ModifierInline
          modifier={
            new UpdateFlagParent({
              registryId: StunnedParentId,
              flagKey: 'isStunned',
              value: true,
              duration: 2,
            })
          }
        />
        .
      </div>
    )
  },
}
