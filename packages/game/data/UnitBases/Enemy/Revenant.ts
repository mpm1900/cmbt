import { nanoid } from 'nanoid'
import { UnitBase, UnitBaseConfig } from '../../../types'
import { PiercingStrike, Protect } from '../../Actions'
import { WitheringAura } from '../../Augments/WitheringAura'
import { PiercingStrikeId, ProtectId } from '../../Ids'
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
  resistances: [],
  weaknesses: [],
}

export const RevenantConfig: UnitBaseConfig = {
  abilities: [WitheringAura],
  actionsCount: 5,
  actions: [
    {
      id: PiercingStrikeId,
      make: (u) => new PiercingStrike(u.id, u.teamId),
    },
    {
      id: ProtectId,
      make: (u) => new Protect(u.id, u.teamId),
    },
  ],
  defaultAbilityId: WitheringAura.id,
  defaultActionIds: [PiercingStrikeId, ProtectId],
}
