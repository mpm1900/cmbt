import { Augment, Modifier, Mutation, Unit } from '../../types'
import { AttackStageDownParentId, DraconicAuraId } from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { AddModifiersPerUnitOnSelfEnter } from '../Triggers'

export const DraconicAura: Augment = {
  id: DraconicAuraId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new AddModifiersPerUnitOnSelfEnter({
        registryId: DraconicAuraId,
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        persistOnSwitch: true,
        targetsLabel: 'all other active units',
        filterUnits: (u) => u.id !== unit.id,
        makeModifiers: (u) => [
          new UpdateStatStageParent({
            registryId: AttackStageDownParentId,
            sourceId: unit.id,
            parentId: u?.id,
            stat: 'attack',
            stages: -1,
          }),
        ],
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
