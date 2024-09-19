import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { PiercingStrike, Protect } from '../../Actions'
import { PhantomSlash } from '../../Actions/PhantomSlash'
import { CursedMiasma } from '../../Augments/CursedMiasma'
import { PhantomSlashId, PiercingStrikeId, ProtectId } from '../../Ids'
import { Bleed, Poison } from '../../Statuses'
import { BASE_UNIT } from '../../Units/system/BASE_UNIT'

export const RevenantId = nanoid()
export const Revenant: UnitBase = {
  id: RevenantId,
  name: 'Revenant',
  stats: {
    ...BASE_UNIT.stats,
    health: 80,
    attack: 120,
    defense: 80,
    magic: 80,
    speed: 135,

    focus: 40,
    stamina: 30,
    devotion: 20,
  },
  tags: [],
  augmentSlots: 3,
  affinities: [],
  resistances: [
    { type: 'blight', factor: 50 },
    { type: 'force', factor: 50 },
  ],
  weaknesses: [{ type: 'holy', factor: 100 }],
  immunities: [
    ...Bleed.modifiers(BASE_UNIT, BASE_UNIT),
    ...Poison.modifiers(BASE_UNIT, BASE_UNIT),
  ],
}

export const RevenantConfig: UnitBaseConfig = {
  abilities: [CursedMiasma],
  actionsCount: 5,
  actions: [
    {
      id: PhantomSlashId,
      make: (u) => new PhantomSlash(u.id, u.teamId),
    },
    {
      id: PiercingStrikeId,
      make: (u) => new PiercingStrike(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
  ],
  defaultAbilityId: CursedMiasma.id,
  defaultActionIds: [PhantomSlashId, PiercingStrikeId, ProtectId],
}
