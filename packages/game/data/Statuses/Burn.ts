import { Status } from '../../types'
import { BurnDamageOnTurnEndId, BurnId, DefenseDownParentId } from '../Ids'
import { UpdateStatParent } from '../Modifiers'
import { DamageParentOnTurnEnd } from '../Triggers'

export const Burn: Status = {
  id: BurnId,
  duration: 5,
  modifiers: (source, parent) => [
    new UpdateStatParent({
      stat: 'defense',
      registryId: DefenseDownParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: BurnId,
      factor: -0.5,
      duration: 5,
      maxInstances: 1,
      persistOnCombatEnd: true,
      persistOnSwitch: true,
    }),
    new DamageParentOnTurnEnd({
      registryId: BurnDamageOnTurnEndId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: BurnId,
      damage: {
        factor: 0.08,
        damageType: 'fire',
        attackType: 'magic',
      },
      duration: 5,
      maxInstances: 1,
      persistOnCombatEnd: true,
      persistOnSwitch: true,
    }),
  ],
  mutations: () => [],
  persistOnSwitch: true,
  persistOnCombatEnd: true,
}
