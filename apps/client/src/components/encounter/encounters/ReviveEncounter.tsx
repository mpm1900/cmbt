import {
  Encounter,
  EncounterChoice,
  EncounterNode,
  Trigger,
} from '@repo/game/types'
import { applyMutations, getModifiersFromUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { GiHeartWings, GiStarAltar } from 'react-icons/gi'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { ChoiceLabel } from '../ChoiceLabel'
import { Narration } from '../Narration'

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
      .map((u) => {
        return applyMutations(
          u,
          getModifiersFromUnit(u).filter((m) => !(m instanceof Trigger))
        )
      })
      .filter((u) => u.stats.health <= u.values.damage)

    console.log(deadUnits)
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
