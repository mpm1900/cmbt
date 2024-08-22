import { Status } from '../../types'
import { BurnDamageOnTurnEndId, BurnedPowerDownId, BurnStatusId } from '../Ids'
import { PhysicalAttackDownParent } from '../Modifiers'
import { DamagePercentParentOnTurnEnd } from '../Triggers/DamagePercentParentOnTurnEnd'

export const BurnStatus: Status = {
  id: BurnStatusId,
  duration: 5,
  modifiers: (source, parent) => [
    new PhysicalAttackDownParent({
      sourceId: source.id,
      parentId: parent.id,
      rid: BurnedPowerDownId,
      statusId: BurnStatusId,
      factor: 2,
      duration: 5,
      maxInstances: 1,
      persistOnCombatEnd: true,
      persistOnSwitch: true,
    }),
    new DamagePercentParentOnTurnEnd({
      sourceId: source.id,
      parentId: parent.id,
      rid: BurnDamageOnTurnEndId,
      statusId: BurnStatusId,
      factor: 0.08,
      duration: 5,
      maxInstances: 1,
      persistOnCombatEnd: true,
      persistOnSwitch: true,
    }),
  ],
  mutations: () => [],
}
