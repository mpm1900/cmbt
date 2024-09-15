import { Status } from '../../types'
import { ChargeId, MagicExpansionUpParentId, SpeedDownParentId } from '../Ids'
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
      registryId: MagicExpansionUpParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: ChargeId,
      stat: 'magicNegation',
      static: 50,
      duration: 5,
      maxInstances: 1,
      percentage: true,
    }),
  ],
  mutations: () => [],
}
