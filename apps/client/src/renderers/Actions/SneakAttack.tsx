import {
  HiddenParentId,
  SneakAttack,
  SneakAttackId,
  UpdateFlagParent,
} from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { DamageListInline } from '@shared/DamageListInline'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const SneakAttackRenderer: ActionRenderer = {
  name: ACTION_NAMES[SneakAttackId],
  description: (a, props) => {
    const action = a as SneakAttack
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to target enemy
        unit. If this unit is{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateFlagParent({
              registryId: HiddenParentId,
              flagKey: 'isHidden',
              value: true,
            })
          }
        />
        , deals{' '}
        <DamageInline
          damage={{ ...action.damages[0], power: action.hiddenPower }}
        />{' '}
        instead. High critical chance. Usually goes first.
      </>
    )
  },
}
