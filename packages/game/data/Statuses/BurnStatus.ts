import { Status } from '../../types'
import { ModifierId, StatusId } from '../Ids'
import { PhysicalAttackDownParent } from '../Modifiers'
import { BurnDamageOnTurnEndId, DamageParentOnTurnEnd } from '../Triggers'

export const BurnedPowerDownId = ModifierId()
export const BurnStatusId = StatusId()
export const BurnStatus: Status = {
  id: BurnStatusId,
  modifiers: (source, parent) => [
    new PhysicalAttackDownParent({
      sourceId: source.id,
      parentId: parent.id,
      rid: BurnedPowerDownId,
      statusId: BurnStatusId,
      coef: 2,
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
