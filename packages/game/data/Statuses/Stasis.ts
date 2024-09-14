import { Status } from '../../types'
import { SpeedDownParentId, StasisId } from '../Ids'
import { UpdateStatParent } from '../Modifiers'

export const Stasis: Status = {
  id: StasisId,
  duration: 5,
  modifiers: (source, parent) => [
    new UpdateStatParent({
      stat: 'speed',
      registryId: SpeedDownParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: StasisId,
      factor: -0.75,
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
