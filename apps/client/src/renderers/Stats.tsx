import { StatKey } from '@repo/game/types'
import { ReactNode } from 'react'
import { GiBiceps, GiPortal, GiShoulderArmor, GiSprint } from 'react-icons/gi'

export type StatRenderer = {
  name: ReactNode
  icon: ReactNode
}

export const StatRenderers: Record<StatKey, StatRenderer | undefined> = {
  accuracy: undefined,
  arcaneExpansion: undefined,
  arcaneNegation: undefined,
  bluntExpansion: undefined,
  bluntNegation: undefined,
  criticalChance: undefined,
  criticalDamage: undefined,
  defense: {
    name: <>Defense</>,
    icon: <GiShoulderArmor />,
  },
  devotion: undefined,
  fireExpansion: undefined,
  fireNegation: undefined,
  focus: undefined,
  forceExpansion: undefined,
  forceNegation: undefined,
  health: undefined,
  magic: {
    name: <>Magic</>,
    icon: <GiPortal />,
  },
  physical: {
    name: <>Physical</>,
    icon: <GiBiceps />,
  },
  shockExpansion: undefined,
  shockNegation: undefined,
  slashExpansion: undefined,
  slashNegation: undefined,
  speed: {
    name: <>Speed</>,
    icon: <GiSprint />,
  },
  stamina: undefined,
  thrustExpansion: undefined,
  thrustNegation: undefined,
}
