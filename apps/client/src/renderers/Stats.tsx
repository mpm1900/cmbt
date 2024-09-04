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
  icon?: ReactNode
}

export const StatRenderers: Record<StatKey, StatRenderer> = {
  accuracy: {
    name: <>Accuracy</>,
    icon: <GiDiceTarget className="h-full w-full" />,
  },
  arcaneExpansion: {
    name: <>Arcane Damage</>,
  },
  arcaneNegation: {
    name: <>Arcane Negation</>,
  },
  blightExpansion: {
    name: <>Blight Damage</>,
  },
  blightNegation: {
    name: <>Blight Negation</>,
  },
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
  devotion: {
    name: <>Devotion</>,
  },
  evasion: {
    name: <>Evasion</>,
    icon: <GiDodging className="h-full w-full" />,
  },
  fireExpansion: {
    name: <>Fire Damage</>,
  },
  fireNegation: {
    name: <>Fire Negation</>,
  },
  focus: {
    name: <>Focus</>,
  },
  forceExpansion: {
    name: <>Force Damage</>,
  },
  forceNegation: {
    name: <>Force Negation</>,
  },
  health: {
    name: <>Health</>,
    icon: <FaHeartbeat className="h-full w-full" />,
  },
  holyExpansion: {
    name: <>Holy Damage</>,
  },
  holyNegation: {
    name: <>Holy Negation</>,
  },
  magic: {
    name: <>Magic</>,
    icon: <GiCursedStar className="h-full w-full" />,
  },
  attack: {
    name: <>Attack</>,
    icon: <GiBiceps className="h-full w-full" />,
  },
  psychicExpansion: {
    name: <>Psychic Damage</>,
  },
  psychicNegation: {
    name: <>Psychic Negation</>,
  },
  shockExpansion: {
    name: <>Shock Damage</>,
  },
  shockNegation: {
    name: <>Shock Negation</>,
  },
  speed: {
    name: <>Speed</>,
    icon: <GiSprint className="h-full w-full" />,
  },
  stamina: {
    name: <>Stamina</>,
  },
}
