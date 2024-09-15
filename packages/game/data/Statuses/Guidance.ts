import { Status } from '../../types'
import {
  AccuracyUpParentId,
  CriticalChanceUpParentId,
  CriticalDamageUpParentId,
  EvasionUpParentId,
  GuidanceId,
} from '../Ids'
import { UpdateStatParent } from '../Modifiers'

export const Guidance: Status = {
  id: GuidanceId,
  duration: 3,
  modifiers: (source, parent) => [
    new UpdateStatParent({
      registryId: AccuracyUpParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: GuidanceId,
      stat: 'accuracy',
      static: 10,
      percentage: true,
      duration: 3,
      maxInstances: 1,
    }),
    new UpdateStatParent({
      registryId: CriticalChanceUpParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: GuidanceId,
      stat: 'criticalChance',
      static: 10,
      percentage: true,
      duration: 3,
      maxInstances: 1,
    }),
    new UpdateStatParent({
      registryId: CriticalDamageUpParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: GuidanceId,
      stat: 'criticalDamage',
      static: 10,
      percentage: true,
      duration: 3,
      maxInstances: 1,
    }),
    new UpdateStatParent({
      registryId: EvasionUpParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: GuidanceId,
      stat: 'evasion',
      static: 10,
      percentage: true,
      duration: 3,
      maxInstances: 1,
    }),
  ],
  mutations: () => [],
}
