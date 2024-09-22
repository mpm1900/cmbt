import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { Narration } from '@/components/encounter/Narration'
import { choice } from '@/worlds/_utils'
import { TeamId, Wolf } from '@repo/game/data'
import { Encounter, EncounterNode, Team } from '@repo/game/types'
import { makeUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { BsQuestionLg } from 'react-icons/bs'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { LuSwords } from 'react-icons/lu'

const IntroductionNode: EncounterNode = {
  id: nanoid(),
  icon: <BsQuestionLg />,
  title: 'Pack of wolves',
  render: (ctx) => {
    ctx.log(
      <Narration>
        Along your way you encounter a pack of 3 wolves. They seem angry, and
        unable to be reasoned with.
      </Narration>
    )
  },
  choices: () => [
    choice({
      before: (
        <ChoiceAttributes>
          <LuSwords />
        </ChoiceAttributes>
      ),
      label: <>Attack the wolves.</>,
      after: <IoMdReturnRight />,
      action: true,
      resolve: (ctx) => {
        const enemyTeam: Team = {
          id: TeamId(),
          resources: { credits: 0 },
          items: [],
          maxActiveUnits: 2,
        }
        const unit = ctx.units.find((u) => true)
        if (unit) {
          ctx.initializeCombat({
            enemyTeam,
            enemyUnits: Array.from({ length: 3 }).map(() => {
              const e = makeUnit({ level: 2, teamId: enemyTeam.id }, [
                Wolf,
                // FlameCultist,
              ])

              return e
            }),
            commit: true,
            reward: {
              items: [],
              resources: {
                credits: 200,
              },
              xp: 15,
            },
            onSuccess: () => {
              ctx.updateActiveWorldNode((n) => ({
                completed: true,
                visited: true,
              }))
              ctx.nav('/world')
            },
            onFailure: () => {},
          })
        }
      },
    }),
    choice({
      before: <ChoiceAttributes>DEBUG</ChoiceAttributes>,
      label: <>Complete encounter</>,
      after: <IoMdReturnLeft />,
      action: true,
      back: true,
    }),
  ],
}

export const FirstCombatEncounterId = nanoid()
export function FirstCombatEncounter(): Encounter {
  return {
    id: FirstCombatEncounterId,
    setup: (ctx) => {
      ctx.clearLog()
    },
    nodes: [IntroductionNode],
    activeNodeId: IntroductionNode.id,
    visitedNodeIds: [],
    values: {},
  }
}
