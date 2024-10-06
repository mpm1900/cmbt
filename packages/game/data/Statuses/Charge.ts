import { Status } from '../../types'
import { ChargeId, ShockNegationUpParentId, SpeedDownParentId } from '../Ids'
import { UpdateStatParent } from '../Modifiers'

export const Charged: Status = {
  id: ChargeId,
  duration: 5,
  modifiers: (source, parent) => [
    new UpdateStatParent({
      registryId: SpeedDownParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: ChargeId,
      stat: 'speed',
      factor: 0.5,
      duration: 5,
      maxInstances: 1,
    }),
    new UpdateStatParent({
      registryId: ShockNegationUpParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: ChargeId,
      stat: 'shockNegation',
      static: 50,
      duration: 5,
      maxInstances: 1,
      percentage: true,
    }),
  ],
  mutations: () => [],
}
