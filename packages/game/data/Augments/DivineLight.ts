import { Augment, Unit } from '../../types'
import { DivineLightId, HiddenParentId, SeenAllId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { AddModifiersToRegistryStaticAllOnUnitEnter } from '../Triggers'

export const DivineLight: Augment = {
  id: DivineLightId,
  modifiers: (unit: Unit) => [
    new AddModifiersToRegistryStaticAllOnUnitEnter({
      registryId: DivineLightId,
      childRegistryId: SeenAllId,
      sourceId: unit.id,
      parentId: unit.id,
      mods: [
        new UpdateFlagParent({
          registryId: HiddenParentId,
          flagKey: 'isHidden',
          value: true,
        }),
      ],
    }),
  ],
  mutations: () => [],
}
