import { Status } from '../../types'
import { BleedDamageId, BleedId, SpeedDownParentId } from '../Ids'
import { UpdateStatParent } from '../Modifiers'
import { DamageParentOnTurnEnd } from '../Triggers'

export const Bleed: Status = {
  id: BleedId,
  duration: 5,
  modifiers: (source, parent) => [
    new UpdateStatParent({
      stat: 'speed',
      registryId: SpeedDownParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: BleedId,
      factor: -0.5,
      duration: 5,
      maxInstances: 1,
      persistOnCombatEnd: true,
      persistOnSwitch: true,
    }),
    new DamageParentOnTurnEnd({
      registryId: BleedDamageId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: BleedId,
      damage: {
        attackType: 'physical',
        damageType: 'blight',
        factor: 0.08,
      },
      duration: 5,
      maxInstances: 1,
      persistOnCombatEnd: true,
      persistOnSwitch: true,
    }),
  ],
  mutations: () => [],
  persistOnCombatEnd: true,
  persistOnSwitch: true,
}
