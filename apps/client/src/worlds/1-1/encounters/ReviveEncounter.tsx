import { ChoiceLabel } from '@/components/encounter/ChoiceLabel'
import { Narration } from '@/components/encounter/Narration'
import { Encounter, EncounterChoice, EncounterNode } from '@repo/game/types'
import { applyModifiersEncounter } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { GiHeartWings, GiStarAltar } from 'react-icons/gi'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'

const ReviveIntroductionNode: EncounterNode = {
  id: nanoid(),
  icon: <GiStarAltar />,
  title: 'Altar of Resurrection',
  text: (
    <div className="space-y-4">
      <Narration>
        You encounter a <span>Altar of Resurrection</span>. One member of your
        party may use this to be revived from dealth with half their max HP.
      </Narration>
    </div>
  ),
  choices: (ctx) => {
    const deadUnits = ctx.units
      .map((u) => applyModifiersEncounter(u))
      .filter((u) => u.stats.health <= u.values.damage)

    return [
      ...deadUnits.map<EncounterChoice>((u) => ({
        id: nanoid(),
        label: (
          <ChoiceLabel
            before={
              <div>
                <GiHeartWings />
              </div>
            }
            after={<IoMdReturnRight />}
          >
            Revive {u.name}
          </ChoiceLabel>
        ),
        resolve: (ctx) => {
          ctx.updateUnit(u.id, (unit) => ({
            values: {
              ...unit.values,
              damage: Math.round(u.stats.health / 2),
            },
          }))
          ctx.updateActiveWorldNode((n) => ({
            completed: true,
            visited: true,
            repeatable: false,
            encounter: ctx.encounter,
          }))
          ctx.back()
        },
      })),
      {
        id: nanoid(),
        label: <ChoiceLabel after={<IoMdReturnLeft />}>Leave</ChoiceLabel>,
        resolve: (ctx) => {
          ctx.updateActiveWorldNode((n) => ({
            completed: true,
            visited: true,
            encounter: ctx.encounter,
          }))
          ctx.back()
        },
      },
    ]
  },
}

export const ReviveEncounter: Encounter = {
  id: nanoid(),
  setup: (ctx) => {},
  activeNodeId: ReviveIntroductionNode.id,
  nodes: [ReviveIntroductionNode],
  visitedNodeIds: [],
  values: {},
}
