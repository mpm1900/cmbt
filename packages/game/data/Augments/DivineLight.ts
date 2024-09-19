import { Augment, Unit } from '../../types'
import { DivineLightId, HiddenParentId, SeenAllId } from '../Ids'
import { AddModifiersToRegistryAll, UpdateFlagParent } from '../Modifiers'
import { AddModifiersOnSelfEnter } from '../Triggers'

export const DivineLight: Augment = {
  id: DivineLightId,
  modifiers: (unit: Unit) => [
    new AddModifiersOnSelfEnter({
      registryId: DivineLightId,
      sourceId: unit.id,
      parentId: unit.id,
      targetsLabel: 'all units',
      persistOnSwitch: true,
      modifiersToAdd: [
        new AddModifiersToRegistryAll({
          registryId: SeenAllId,
          sourceId: unit.id,
          parentId: unit.id,
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
