import { Status } from '../../types'
import { PoisonedDamageOnTurnEndId, PoisonId } from '../Ids'
import { DamageParentOnTurnEnd } from '../Triggers'

export const Poison: Status = {
  id: PoisonId,
  modifiers: (source, parent) => [
    new DamageParentOnTurnEnd({
      sourceId: source.id,
      parentId: parent.id,
      statusId: PoisonId,
      registryId: PoisonedDamageOnTurnEndId,
      damage: {
        factor: 1 / 8,
        damageType: 'blight',
      },
      maxInstances: 1,
      persistOnSwitch: true,
      persistOnCombatEnd: true,
    }),
  ],
  mutations: () => [],
  persistOnSwitch: true,
  persistOnCombatEnd: true,
}
