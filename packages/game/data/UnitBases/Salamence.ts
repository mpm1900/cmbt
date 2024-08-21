import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { Fireball, FireBlast, HyperBeam } from '../Actions'
import { Intimidate } from '../Augments'
import { FireballId, FireBlastId, HyperBeamId, IntimidateId } from '../Ids'
import { ZERO_UNIT } from '../Units'

export const Salamence: UnitBase = {
  id: nanoid(),
  name: 'Salamence',
  stats: {
    ...ZERO_UNIT.stats,
    health: 95,
    physical: 95,
    defense: 80,
    magic: 110,
    speed: 100,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
}

export const SalamenceConfig: UnitBaseConfig = {
  abilities: [Intimidate],
  actionsCount: 5,
  actions: [
    {
      id: FireballId,
      make: (unit) => new Fireball(unit.id, unit.teamId),
    },
    {
      id: FireBlastId,
      make: (unit) => new FireBlast(unit.id, unit.teamId),
    },
    {
      id: HyperBeamId,
      make: (unit) => new HyperBeam(unit.id, unit.teamId),
    },
  ],
  defaultAbilityId: IntimidateId,
  defaultActionIds: [FireballId, FireBlastId, HyperBeamId],
}
