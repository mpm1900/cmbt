import { Unit } from '../../../types'

export const ZERO_UNIT: Unit = {
  id: '',
  name: '',
  teamId: '',
  stats: {
    health: 0,
    defense: 0,
    physical: 0,
    magic: 0,
    speed: 0,

    accuracy: 0,
    criticalChance: 0,
    criticalDamage: 0,

    focus: 0,
    stamina: 0,
    devotion: 0,

    arcaneNegation: 0,
    bluntNegation: 0,
    fireNegation: 0,
    forceNegation: 0,
    shockNegation: 0,
    slashNegation: 0,
    thrustNegation: 0,

    arcaneExpansion: 0,
    bluntExpansion: 0,
    fireExpansion: 0,
    forceExpansion: 0,
    shockExpansion: 0,
    slashExpansion: 0,
    thrustExpansion: 0,
  },
  values: {
    damage: 0,
    physicalArmor: 0,
    magicArmor: 0,
    focus: 0,
    stamina: 0,
    devotion: 0,
  },
  flags: {
    isActive: false,
    isProtected: false,
    isInspected: false,
    isStunned: false,
  },
  registry: {
    actions: [],
    modifiers: [],
  },
  modifiers: () => [],
  actions: [],
  metadata: {
    lastUsedActionId: undefined,
    modified: false,
    hasBeenSeen: false,
    activeTurns: 0,
  },
}
