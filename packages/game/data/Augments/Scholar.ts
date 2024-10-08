import { Augment, Modifier, Mutation, Unit } from '../../types'
import { InspectedAllId, ScholarId } from '../Ids'
import { UpdateFlagTeam } from '../Modifiers'
import { AddModifiersOnSelfEnter } from '../Triggers'

export const Scholar: Augment = {
  id: ScholarId,
  modifiers(unit: Unit): Modifier[] {
    return [
      new AddModifiersOnSelfEnter({
        registryId: ScholarId,
        sourceId: unit.id,
        parentId: unit.id,
        maxInstances: 1,
        persistOnSwitch: true,
        targetsLabel: 'all enemies',
        makeModifiers: () => [
          new UpdateFlagTeam({
            maxInstances: 1,
            registryId: InspectedAllId,
            sourceId: unit.id,
            parentId: unit.id,
            notTeamId: unit.teamId,
            flag: 'isInspected',
            value: true,
          }),
        ],
      }),
    ]
  },
  mutations(unit: Unit): Mutation[] {
    return []
  },
}
