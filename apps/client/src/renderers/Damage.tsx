import { DamageType } from '@repo/game/types'
import { ReactNode } from 'react'
import { BsLightningChargeFill } from 'react-icons/bs'
import { GiFist } from 'react-icons/gi'
import { ImFire } from 'react-icons/im'
import { PiHandEyeFill, PiPentagramFill } from 'react-icons/pi'

export type DamageRenderer = {
  name: ReactNode
  icon: ReactNode
}

export const DamageRenderers: Record<DamageType, DamageRenderer | undefined> = {
  arcane: {
    name: <>Arcane</>,
    icon: <PiPentagramFill />,
  },
  fire: {
    name: <>Fire</>,
    icon: <ImFire />,
  },
  force: {
    name: <>Force</>,
    icon: <GiFist />,
  },
  psychic: {
    name: <>Psychic</>,
    icon: <PiHandEyeFill />,
  },
  shock: {
    name: <>Shock</>,
    icon: <BsLightningChargeFill />,
  },
}
