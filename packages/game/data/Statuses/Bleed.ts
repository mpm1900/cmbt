import { Status } from '../../types'
import { BleedId } from '../Ids'
import { DamageParentOnTurnEnd } from '../Triggers'

export const Bleed: Status = {
  id: BleedId,
  duration: 5,
  modifiers: (source, parent) => [
    new DamageParentOnTurnEnd({
      sourceId: source.id,
      parentId: parent.id,
      statusId: BleedId,
      factor: 0.1,
      damageType: 'blight',
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
