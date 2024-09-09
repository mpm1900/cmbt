import { Unit } from '../../../types'

export const ZERO_UNIT: Unit = {
  id: '',
  teamId: '',
  baseId: '',
  name: '',
  level: 0,
  xp: 0,
  stats: {
    health: 0,
    defense: 0,
    attack: 0,
    magic: 0,
    speed: 0,

    accuracy: 0,
    evasion: 0,
    criticalChance: 0,
    criticalDamage: 0,

    focus: 0,
    stamina: 0,
    devotion: 0,

    physicalExpansion: 0,
    magicExpansion: 0,

    physicalNegation: 0,
    magicNegation: 0,

    arcaneNegation: 0,
    blightNegation: 0,
    fireNegation: 0,
    forceNegation: 0,
    holyNegation: 0,
    psychicNegation: 0,
    shockNegation: 0,

    arcaneExpansion: 0,
    blightExpansion: 0,
    fireExpansion: 0,
    forceExpansion: 0,
    holyExpansion: 0,
    psychicExpansion: 0,
    shockExpansion: 0,

    xpMultiplier: 0,
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
    isHexed: false,
    isProtected: false,
    isInspected: false,
    isStunned: false,
  },
  registry: {
    actions: [],
    modifiers: [],
  },
  augments: [],
  modifiers: () => [],
  actions: [],
  metadata: {
    lastUsedActionId: undefined,
    modified: false,
    hasBeenSeen: false,
    activeTurns: 0,
  },
}
