import { StatKey } from '@repo/game/types'
import { ReactNode } from 'react'
import { FaHeartbeat } from 'react-icons/fa'
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
    icon: <GiDiceTarget className="h-full w-full" />,
  },
  arcaneExpansion: undefined,
  arcaneNegation: undefined,
  criticalChance: {
    name: <>Crit Chance</>,
    icon: <PiTargetFill className="h-full w-full" />,
  },
  criticalDamage: {
    name: <>Crit Damage</>,
    icon: <GiArrowScope className="h-full w-full" />,
  },
  defense: {
    name: <>Defense</>,
    icon: <GiShoulderArmor className="h-full w-full" />,
  },
  devotion: undefined,
  evasion: {
    name: <>Evasion</>,
    icon: <GiDodging className="h-full w-full" />,
  },
  fireExpansion: undefined,
  fireNegation: undefined,
  focus: undefined,
  forceExpansion: undefined,
  forceNegation: undefined,
  health: {
    name: <>Health</>,
    icon: <FaHeartbeat className="h-full w-full" />,
  },
  magic: {
    name: <>Magic</>,
    icon: <GiPortal className="h-full w-full" />,
  },
  physical: {
    name: <>Physical</>,
    icon: <GiBiceps className="h-full w-full" />,
  },
  psychicExpansion: undefined,
  psychicNegation: undefined,
  shockExpansion: undefined,
  shockNegation: undefined,
  speed: {
    name: <>Speed</>,
    icon: <GiSprint className="h-full w-full" />,
  },
  stamina: undefined,
}
