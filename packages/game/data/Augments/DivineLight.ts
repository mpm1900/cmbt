import { Augment, Unit } from '../../types'
import { DivineLightId, HiddenParentId, SeenAllId } from '../Ids'
import { AddModifiersToRegistryTeam, UpdateFlagParent } from '../Modifiers'
import { AddModifiersOnSelfEnter } from '../Triggers'

export const DivineLight: Augment = {
  id: DivineLightId,
  modifiers: (unit: Unit) => [
    new AddModifiersOnSelfEnter({
      registryId: DivineLightId,
      sourceId: unit.id,
      parentId: unit.id,
      targetsLabel: 'all enemies',
      persistOnSwitch: true,
      maxInstances: 1,
      makeModifiers: () => [
        new AddModifiersToRegistryTeam({
          notTeamId: unit.teamId,
          registryId: SeenAllId,
          sourceId: unit.id,
          parentId: unit.id,
          maxInstances: 1,
          modifiers: [
            new UpdateFlagParent({
              registryId: HiddenParentId,
              flag: 'isHidden',
              value: true,
            }),
          ],
        }),
      ],
    }),
  ],
  mutations: () => [],
}
