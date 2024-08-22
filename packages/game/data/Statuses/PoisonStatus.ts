import { Status } from '../../types'
import { PoisonedDamageOnTurnEndId, PoisonStatusId } from '../Ids'
import { DamagePercentParentOnTurnEnd } from '../Triggers/DamagePercentParentOnTurnEnd'

export const PoisonStatus: Status = {
  id: PoisonStatusId,
  modifiers: (source, parent) => [
    new DamagePercentParentOnTurnEnd({
      sourceId: source.id,
      parentId: parent.id,
      statusId: PoisonStatusId,
      rid: PoisonedDamageOnTurnEndId,
      factor: 1 / 8,
      maxInstances: 1,
    }),
  ],
  mutations: () => [],
}
