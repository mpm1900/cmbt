import { Status } from '../../types'
import { BleedDamageId, BleedId } from '../Ids'
import { DamageParentOnTurnEnd } from '../Triggers'

export const Bleed: Status = {
  id: BleedId,
  duration: 5,
  modifiers: (source, parent) => [
    new DamageParentOnTurnEnd({
      registryId: BleedDamageId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: BleedId,
      damage: {
        attackType: 'physical',
        damageType: 'blight',
        factor: 0.1,
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
