import { ChoiceLabel } from '@/components/encounter/ChoiceLabel'
import { Narration } from '@/components/encounter/Narration'
import { Key01Key } from '@repo/game/data'
import { Encounter, EncounterChoice, EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { HiLockClosed } from 'react-icons/hi2'
import { IoMdReturnLeft } from 'react-icons/io'
import { MdOutlineVpnKey } from 'react-icons/md'

const LockedNodeId = nanoid()
const LockedNode1 = (): EncounterNode => {
  return {
    id: LockedNodeId,
    icon: <HiLockClosed />,
    title: 'Locked Door',
    text: <Narration>The door before you is locked.</Narration>,
    choices: (ctx) => {
      const choices: EncounterChoice[] = [
        {
          id: LockedNodeId,
          label: (
            <ChoiceLabel
              before={<MdOutlineVpnKey />}
              after={<IoMdReturnLeft />}
            >
              Unlock the door
            </ChoiceLabel>
          ),
          resolve: (ctx) => {
            ctx.updateActiveWorldNode((n) => ({
              locked: false,
              completed: true,
            }))
            ctx.back()
          },
        },
        {
          id: nanoid(),
          label: <ChoiceLabel after={<IoMdReturnLeft />}>Leave</ChoiceLabel>,
          resolve: (ctx) => ctx.back(),
        },
      ]

      if (ctx.team?.items.find((i) => i.key === Key01Key)) {
        return [
          {
            id: LockedNodeId,
            label: (
              <ChoiceLabel
                before={<MdOutlineVpnKey />}
                after={<IoMdReturnLeft />}
              >
                Unlock the door
              </ChoiceLabel>
            ),
            resolve: (ctx) => {
              ctx.updateActiveWorldNode((n) => ({
                locked: false,
                completed: true,
              }))
              ctx.back()
            },
          },
          ...choices,
        ]
      }

      return choices
    },
  }
}

export const LockedEncounterId = nanoid()
export const LockedEncounter: Encounter = {
  id: LockedEncounterId,
  setup: () => {},
  nodes: [LockedNode1()],
  activeNodeId: LockedNodeId,
  visitedNodeIds: [],
  values: {},
}
