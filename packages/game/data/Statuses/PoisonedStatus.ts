import { Status } from '../../types'
import { PoisonedDamageOnTurnEndId, PoisonedStatusId } from '../Ids'
import { DamagePercentParentOnTurnEnd } from '../Triggers/DamagePercentParentOnTurnEnd'

export const PoisonedStatus: Status = {
  id: PoisonedStatusId,
  modifiers: (source, parent) => [
    new DamagePercentParentOnTurnEnd({
      sourceId: source.id,
      parentId: parent.id,
      rid: PoisonedDamageOnTurnEndId,
      factor: 1 / 8,
      maxInstances: 1,
    }),
  ],
  mutations: () => [],
}
