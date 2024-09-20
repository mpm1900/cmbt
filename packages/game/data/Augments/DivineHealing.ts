import { Augment } from '../../types'
import { DivineHealingId } from '../Ids'
import { HealParentOnTurnEnd } from '../Triggers'

export const DivineHealing: Augment = {
  id: DivineHealingId,
  modifiers(unit) {
    return [
      new HealParentOnTurnEnd({
        registryId: DivineHealingId,
        sourceId: unit.id,
        parentId: unit.id,
        factor: 0.1,
        maxInstances: 1,
        persistOnSwitch: true,
      }),
      /*
      new DamageSourceOnSelfTakeDamage({
        registryId: LightningAuraOnTakeDamageId,
        sourceId: unit.id,
        parentId: unit.id,
        damage: {
          factor: 0.1,
          attackType: 'magic',
          damageType: 'shock',
        },
      }),
      */
    ]
  },
  mutations(unit) {
    return []
  },
}
