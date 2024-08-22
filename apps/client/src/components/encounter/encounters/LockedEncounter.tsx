import { Key01Id } from '@repo/game/data'
import { Encounter, EncounterChoice, EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { IoMdReturnLeft } from 'react-icons/io'
import { MdOutlineVpnKey } from 'react-icons/md'
import { Narration } from '../Narration'

const LockedNodeId = nanoid()
const LockedNode1 = (): EncounterNode => {
  return {
    id: LockedNodeId,
    title: 'Locked Door',
    text: <Narration>The door before you is locked.</Narration>,
    choices: (ctx) => {
      const options: EncounterChoice[] = [
        {
          id: nanoid(),
          label: (
            <div className="flex space-x-2 items-center">
              <IoMdReturnLeft />
              <span>Leave</span>
            </div>
          ),
          resolve: (ctx) => ctx.back(),
        },
      ]

      if (ctx.team?.items.find((i) => i.id === Key01Id)) {
        return [
          {
            id: LockedNodeId,
            label: (
              <div className="flex space-x-2 items-center">
                <MdOutlineVpnKey />
                <span>Unlock the door</span>
              </div>
            ),
            resolve: (ctx) => {
              ctx.updateActiveWorldNode((n) => ({
                locked: false,
                completed: true,
              }))
              ctx.back()
            },
          },
          ...options,
        ]
      }

      return options
    },
  }
}

export const LockedEncounterId = nanoid()
export const LockedEncounter: Encounter = {
  id: LockedEncounterId,
  nodes: [LockedNode1()],
  activeNodeId: LockedNodeId,
  values: {},
}
