import { DamageType } from '@repo/game/types'
import { ReactNode } from 'react'
import { PiPentagramFill } from 'react-icons/pi'

export type DamageRenderer = {
  name: ReactNode
  icon: ReactNode
}

export const DamageRenderers: Record<DamageType, DamageRenderer | undefined> = {
  arcane: {
    name: <>Arcane</>,
    icon: <PiPentagramFill />,
  },
  blunt: undefined,
  fire: undefined,
  force: undefined,
  shock: undefined,
  slash: undefined,
  thrust: undefined,
}
