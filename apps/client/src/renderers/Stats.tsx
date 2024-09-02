import { StatKey } from '@repo/game/types'
import { ReactNode } from 'react'
import { FaHeartbeat } from 'react-icons/fa'
import {
  GiArrowScope,
  GiBiceps,
  GiCrenulatedShield,
  GiCursedStar,
  GiDiceTarget,
  GiDodging,
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
    icon: <GiCrenulatedShield className="h-full w-full" />,
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
    icon: <GiCursedStar className="h-full w-full" />,
  },
  attack: {
    name: <>Attack</>,
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
