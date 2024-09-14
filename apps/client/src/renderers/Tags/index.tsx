import { BeastId } from '@repo/game/data'
import { Id } from '@repo/game/types'
import { ReactNode } from '@tanstack/react-router'

import { GiWolfHead } from 'react-icons/gi'

export const TAG_ICONS: Record<Id, ReactNode> = {
  [BeastId]: <GiWolfHead className="fill-white h-full w-full" />,
}
