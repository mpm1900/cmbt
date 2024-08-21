import { StatKey } from '@repo/game/types'
import { ReactNode } from 'react'
import {
  GiArrowScope,
  GiBiceps,
  GiDiceTarget,
  GiDodging,
  GiPortal,
  GiShoulderArmor,
  GiSprint,
} from 'react-icons/gi'
import { PiTargetFill } from 'react-icons/pi'

export type StatRenderer = {
  name: ReactNode
  icon: ReactNode
}

export const StatRenderers: Record<StatKey, StatRenderer | undefined> = {
  accuracy: {
    name: <>Accuracy</>,
    icon: <GiDiceTarget />,
  },
  arcaneExpansion: undefined,
  arcaneNegation: undefined,
  criticalChance: {
    name: <>Crit Chance</>,
    icon: <PiTargetFill />,
  },
  criticalDamage: {
    name: <>Crit Damage</>,
    icon: <GiArrowScope />,
  },
  defense: {
    name: <>Defense</>,
    icon: <GiShoulderArmor />,
  },
  devotion: undefined,
  evasion: {
    name: <>Evasion</>,
    icon: <GiDodging />,
  },
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
  psychicExpansion: undefined,
  psychicNegation: undefined,
  shockExpansion: undefined,
  shockNegation: undefined,
  speed: {
    name: <>Speed</>,
    icon: <GiSprint />,
  },
  stamina: undefined,
}
