import { Status } from '../../types'
import { AttackDownParentId, BurnDamageId, BurnId } from '../Ids'
import { UpdateStatParent } from '../Modifiers'
import { DamageParentOnTurnEnd } from '../Triggers'

export const Burn: Status = {
  id: BurnId,
  duration: 5,
  modifiers: (source, parent) => [
    new UpdateStatParent({
      stat: 'attack',
      registryId: AttackDownParentId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: BurnId,
      factor: -0.5,
      duration: 5,
      maxInstances: 1,
      persistOnCombatEnd: true,
      persistOnSwitch: true,
    }),
    new DamageParentOnTurnEnd({
      registryId: BurnDamageId,
      sourceId: source.id,
      parentId: parent.id,
      statusId: BurnId,
      factor: 0.08,
      damageType: 'fire',
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
