import { Status } from '../../types'
import { BurnId } from '../Ids'
import { AttackDownParent } from '../Modifiers'
import { DamageParentOnTurnEnd } from '../Triggers'

export const Burn: Status = {
  id: BurnId,
  duration: 5,
  modifiers: (source, parent) => [
    new AttackDownParent({
      sourceId: source.id,
      parentId: parent.id,
      statusId: BurnId,
      factor: 0.5,
      duration: 5,
      maxInstances: 1,
      persistOnCombatEnd: true,
      persistOnSwitch: true,
    }),
    new DamageParentOnTurnEnd({
      sourceId: source.id,
      parentId: parent.id,
      statusId: BurnId,
      factor: 0.08,
      duration: 5,
      maxInstances: 1,
      persistOnCombatEnd: true,
      persistOnSwitch: true,
    }),
  ],
  mutations: () => [],
}
