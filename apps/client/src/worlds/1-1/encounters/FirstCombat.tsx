import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { ChoiceLabel } from '@/components/encounter/ChoiceLabel'
import { Narration } from '@/components/encounter/Narration'
import { Separator } from '@/components/ui/separator'
import { TeamId, Wolf } from '@repo/game/data'
import { Encounter, EncounterNode, Team } from '@repo/game/types'
import { makeEnemyUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { BsQuestionLg } from 'react-icons/bs'
import { GiCrossedSwords } from 'react-icons/gi'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'

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
    ctx.log(<Separator />)
  },
  choices: () => [
    {
      id: nanoid(),
      label: (
        <ChoiceLabel
          before={
            <ChoiceAttributes>
              <GiCrossedSwords />
            </ChoiceAttributes>
          }
          after={<IoMdReturnRight />}
        >
          Attack the wolves.
        </ChoiceLabel>
      ),
      resolve: (ctx) => {
        const enemyTeam: Team = {
          id: TeamId(),
          resources: { credits: 0 },
          items: [],
          maxActiveUnits: 3,
        }
        const unit = ctx.units.find((u) => true)
        if (unit) {
          ctx.initializeCombat({
            enemyTeam,
            enemyUnits: Array.from({ length: 3 }).map(() =>
              makeEnemyUnit({ level: 12, teamId: enemyTeam.id }, [Wolf])
            ),
            reward: {
              items: [],
              resources: {
                credits: 200,
              },
              xp: 2024,
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
    },
    {
      id: nanoid(),
      label: (
        <ChoiceLabel after={<IoMdReturnLeft />}>
          [DEBUG] Complete encounter
        </ChoiceLabel>
      ),
      resolve: (ctx) => {
        ctx.updateActiveWorldNode((n) => ({
          completed: true,
          visited: true,
        }))
        ctx.back()
      },
    },
  ],
}

export const FirstCombatEncounterId = nanoid()
export function FirstCombatEncounter(): Encounter {
  return {
    id: FirstCombatEncounterId,
    setup: () => {},
    nodes: [IntroductionNode],
    activeNodeId: IntroductionNode.id,
    visitedNodeIds: [],
    values: {},
  }
}
