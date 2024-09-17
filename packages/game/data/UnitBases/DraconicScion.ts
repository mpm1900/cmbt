import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Bane,
  Boast,
  DragonBreath,
  DragonStance,
  Fireball,
  GhostFlame,
  Provoke,
  Pyroclash,
  RetreatingBlow,
  Slash,
} from '../Actions'
import { DraconicAura } from '../Augments'
import {
  BaneId,
  BoastId,
  DraconicAuraId,
  DragonBreathId,
  DragonStanceId,
  FireballId,
  GhostFlameId,
  ProvokeId,
  PyroclashId,
  RetreatingBlowId,
  SlashId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const DraconicScion: UnitBase = {
  id: nanoid(),
  name: 'Draconic Scion',
  stats: {
    ...BASE_UNIT.stats,
    health: 95,
    attack: 115,
    defense: 90,
    magic: 80,
    speed: 60,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [{ type: 'fire', factor: 50 }],
  resistances: [{ type: 'fire', factor: 50 }],
  weaknesses: [],
}

export const DraconicDiscipleConfig: UnitBaseConfig = {
  abilities: [DraconicAura],
  actionsCount: 5,
  actions: [
    {
      id: BaneId,
      make: (unit) => new Bane(unit.id, unit.teamId),
    },
    {
      id: BoastId,
      make: (unit) => new Boast(unit.id, unit.teamId),
    },
    {
      id: DragonBreathId,
      make: (unit) => new DragonBreath(unit.id, unit.teamId),
    },
    {
      id: DragonStanceId,
      make: (unit) => new DragonStance(unit.id, unit.teamId),
    },
    {
      id: FireballId,
      make: (unit) => new Fireball(unit.id, unit.teamId),
    },
    {
      id: GhostFlameId,
      make: (unit) => new GhostFlame(unit.id, unit.teamId),
    },
    {
      id: ProvokeId,
      make: (u) => new Provoke(u.id, u.teamId),
    },
    {
      id: PyroclashId,
      make: (unit) => new Pyroclash(unit.id, unit.teamId),
    },
    {
      id: RetreatingBlowId,
      make: (unit) => new RetreatingBlow(unit.id, unit.teamId),
    },
    {
      id: SlashId,
      make: (unit) => new Slash(unit.id, unit.teamId),
    },
  ],
  defaultAbilityId: DraconicAuraId,
  defaultActionIds: [
    BaneId,
    DragonBreathId,
    PyroclashId,
    RetreatingBlowId,
    BoastId,
  ],
}
