import { Status } from '../../types'
import { BurnDamageOnTurnEndId, BurnedPowerDownId, BurnStatusId } from '../Ids'
import { PhysicalAttackDownParent } from '../Modifiers'
import { DamageParentOnTurnEnd } from '../Triggers'

export const BurnStatus: Status = {
  id: BurnStatusId,
  modifiers: (source, parent) => [
    new PhysicalAttackDownParent({
      sourceId: source.id,
      parentId: parent.id,
      rid: BurnedPowerDownId,
      statusId: BurnStatusId,
      factor: 2,
      duration: 5,
      maxInstances: 1,
    }),
    new DamageParentOnTurnEnd({
      sourceId: source.id,
      parentId: parent.id,
      rid: BurnDamageOnTurnEndId,
      statusId: BurnStatusId,
      damage: 10,
      duration: 5,
      maxInstances: 1,
    }),
  ],
  mutations: () => [],
}
