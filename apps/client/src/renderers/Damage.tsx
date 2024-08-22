import { DamageType } from '@repo/game/types'
import { ReactNode } from 'react'
import { BsLightningChargeFill } from 'react-icons/bs'
import { GiPunchBlast } from 'react-icons/gi'
import { ImFire } from 'react-icons/im'
import { PiHandEyeFill, PiPentagramFill } from 'react-icons/pi'

export type DamageRenderer = {
  name: ReactNode
  icon: ReactNode
}

export const DamageRenderers: Record<DamageType, DamageRenderer | undefined> = {
  arcane: {
    name: <>Arcane</>,
    icon: <PiPentagramFill className="h-full w-full" />,
  },
  fire: {
    name: <>Fire</>,
    icon: <ImFire className="h-full w-full" />,
  },
  force: {
    name: <>Force</>,
    icon: <GiPunchBlast className="h-full w-full" />,
  },
  psychic: {
    name: <>Psychic</>,
    icon: <PiHandEyeFill className="h-full w-full" />,
  },
  shock: {
    name: <>Shock</>,
    icon: <BsLightningChargeFill className="h-full w-full" />,
  },
}
