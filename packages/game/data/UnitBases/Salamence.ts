import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import { Fireball, FireBlast, HyperBeam, Slash } from '../Actions'
import { Intimidate } from '../Augments'
import {
  FireballId,
  FireBlastId,
  HyperBeamId,
  IntimidateId,
  SlashId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Salamence: UnitBase = {
  id: nanoid(),
  name: 'Battlemage',
  stats: {
    ...BASE_UNIT.stats,
    health: 95,
    physical: 115,
    defense: 70,
    magic: 115,
    speed: 100,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  augmentSlots: 3,
  affinities: [],
  resistances: [],
  weaknesses: [],
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
    {
      id: SlashId,
      make: (unit) => new Slash(unit.id, unit.teamId),
    },
  ],
  defaultAbilityId: IntimidateId,
  defaultActionIds: [FireballId, FireBlastId, HyperBeamId, SlashId],
}
