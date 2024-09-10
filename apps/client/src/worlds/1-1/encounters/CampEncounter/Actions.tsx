import { choice } from '@/worlds/_utils'
import { EncounterContext } from '@repo/game/types'
import { IoMdReturnLeft } from 'react-icons/io'

export function CampEncounterActions(ctx: EncounterContext) {
  return [
    choice({
      label: <IoMdReturnLeft />,
      back: true,
    }),
  ]
}
