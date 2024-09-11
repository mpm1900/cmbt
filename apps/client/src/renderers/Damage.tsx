import { DamageType } from '@repo/game/types'
import { ReactNode } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { BsFire, BsLightningChargeFill } from 'react-icons/bs'
import { GiEclipseFlare, GiPunchBlast } from 'react-icons/gi'
import { IoSkull } from 'react-icons/io5'
import { RiMoonClearFill } from 'react-icons/ri'

export type DamageRenderer = {
  color: string
  name: ReactNode
  icon: ReactNode
}

export const DamageRenderers: Record<DamageType, DamageRenderer | undefined> = {
  arcane: {
    color: '#fb7185',
    name: <>Arcane</>,
    icon: <RiMoonClearFill className="h-full w-full fill-inherit" />,
  },
  blight: {
    color: '#2dd4bf',
    name: <>Blight</>,
    icon: <IoSkull className="h-full w-full fill-inherit" />,
  },
  fire: {
    color: '#fb923c',
    name: <>Fire</>,
    icon: <BsFire className="h-full w-full fill-inherit" />,
  },
  force: {
    color: '#ffffff',
    name: <>Force</>,
    icon: <GiPunchBlast className="h-full w-full fill-inherit" />,
  },
  holy: {
    color: '#fde68a',
    name: <>Holy</>,
    icon: <GiEclipseFlare className="h-full w-full fill-inherit" />,
  },
  psychic: {
    color: '#a78bfa',
    name: <>Psychic</>,
    icon: <AiFillEye className="h-full w-full fill-inherit" />,
  },
  shock: {
    color: '#38bdf8',
    name: <>Shock</>,
    icon: <BsLightningChargeFill className="h-full w-full fill-inherit" />,
  },
}
