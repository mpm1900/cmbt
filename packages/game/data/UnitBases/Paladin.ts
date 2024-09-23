import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../types'
import {
  Bane,
  Bless,
  Block,
  Boast,
  Cleave,
  HealingWord,
  LayOnHands,
  PhantomSlash,
  PowerSink,
  Protect,
  RetreatingBlow,
  Slash,
  Smite,
} from '../Actions'
import { HoldCreature } from '../Actions/HoldCreature'
import { DivineLight } from '../Augments/DivineLight'
import {
  BaneId,
  BlessId,
  BlockId,
  BoastId,
  CleaveId,
  DivineLightId,
  HealingWordId,
  HoldCreatureId,
  LayOnHandsId,
  PhantomSlashId,
  PowerSinkId,
  ProtectId,
  RetreatingBlowId,
  SlashId,
  SmiteId,
} from '../Ids'
import { BASE_UNIT } from '../Units/system/BASE_UNIT'

export const Paladin: UnitBase = {
  id: nanoid(),
  name: 'Paladin',
  stats: {
    ...BASE_UNIT.stats,
    health: 120,
    attack: 100,
    defense: 95,
    magic: 100,
    speed: 60,
    memory: 5,

    focus: 40,
    stamina: 30,
    devotion: 20,

    xpMultiplier: 70,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [
    { type: 'holy', factor: 20 },
    { type: 'force', factor: 20 },
  ],
  resistances: [
    { type: 'holy', factor: 25 },
    { type: 'blight', factor: 25 },
  ],
  weaknesses: [{ type: 'psychic', factor: 25 }],
  immunities: [],
}

export const PaladinConfig: UnitBaseConfig = {
  abilities: [DivineLight],
  actions: [
    {
      id: BaneId,
      make: (u) => new Bane(u.id, u.teamId),
    },
    {
      id: BlessId,
      make: (u) => new Bless(u.id, u.teamId),
    },
    {
      id: BlockId,
      make: (u) => new Block(u.id, u.teamId),
    },
    {
      id: BoastId,
      make: (u) => new Boast(u.id, u.teamId),
    },
    {
      id: CleaveId,
      make: (u) => new Cleave(u.id, u.teamId),
    },
    {
      id: HealingWordId,
      make: (u) => new HealingWord(u.id, u.teamId),
    },
    {
      id: HoldCreatureId,
      make: (u) => new HoldCreature(u.id, u.teamId),
    },
    {
      id: LayOnHandsId,
      make: (u) => new LayOnHands(u.id, u.teamId),
    },
    {
      id: PhantomSlashId,
      make: (u) => new PhantomSlash(u.id, u.teamId),
    },
    {
      id: PowerSinkId,
      make: (u) => new PowerSink(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
    {
      id: RetreatingBlowId,
      make: (u) => new RetreatingBlow(u.id, u.teamId),
    },
    {
      id: SlashId,
      make: (u) => new Slash(u.id, u.teamId),
    },
    {
      id: SmiteId,
      make: (u) => new Smite(u.id, u.teamId),
    },
  ],
  defaultAbilityId: DivineLightId,
  defaultActionIds: [
    BaneId,
    HoldCreatureId,
    PowerSinkId,
    RetreatingBlowId,
    SmiteId,
  ],
}
