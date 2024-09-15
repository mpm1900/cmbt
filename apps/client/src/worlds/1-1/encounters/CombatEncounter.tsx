import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { ChoiceLabel } from '@/components/encounter/ChoiceLabel'
import { Narration } from '@/components/encounter/Narration'
import { Separator } from '@/components/ui/separator'
import {
  ENEMY_BASES,
  RestlessSpirit,
  Snake,
  SpeedUpTeamId,
  TeamId,
  UpdateStatTeam,
  Wolf,
} from '@repo/game/data'
import { Encounter, EncounterNode, Team } from '@repo/game/types'
import { makeUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { BsQuestionLg } from 'react-icons/bs'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { IoSkullSharp } from 'react-icons/io5'
import { LuSwords } from 'react-icons/lu'

const CombatIntroductionNode: EncounterNode = {
  id: nanoid(),
  icon: <BsQuestionLg />,
  title: 'Enemies in the distance',
  render: (ctx) => {
    ctx.log(
      <Narration>
        Ahead of you stands a group of enemies. They don't seem to have noticed
        you yet.
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
              <LuSwords />
              {', 50%'}
            </ChoiceAttributes>
          }
          after={<IoMdReturnRight />}
        >
          Ambush the enemies
        </ChoiceLabel>
      ),
      resolve: (ctx) => {
        const enemyTeam: Team = {
          id: TeamId(),
          resources: { credits: 0 },
          items: [],
          maxActiveUnits: 3,
        }
        if (ctx.team && ctx.units.length > 0) {
          ctx.initializeCombat({
            enemyTeam,
            enemyUnits: Array.from({ length: 3 }).map(() =>
              makeUnit({ level: 12, teamId: enemyTeam.id }, [
                Wolf,
                Snake,
                RestlessSpirit,
              ])
            ),
            commit: true,
            reward: {
              items: [],
              resources: {
                credits: 200,
              },
              xp: 2024,
            },
            modifiers: [
              new UpdateStatTeam({
                registryId: SpeedUpTeamId,
                teamId: ctx.team.id,
                stat: 'speed',
                factor: 0.5,
                duration: 2,
              }),
            ],
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
        <ChoiceLabel
          before={
            <ChoiceAttributes>
              <BsQuestionLg />
            </ChoiceAttributes>
          }
          after={<IoMdReturnRight />}
        >
          Get the enemies' attention
        </ChoiceLabel>
      ),
      resolve: (ctx) =>
        ctx.updateEncounter((e) => ({ activeNodeId: CombatNode2.id })),
    },
    {
      id: nanoid(),
      label: <ChoiceLabel after={<IoMdReturnLeft />}>Leave</ChoiceLabel>,
      resolve: (ctx) => {
        ctx.updateActiveWorldNode((n) => ({
          visited: true,
        }))
        ctx.back()
      },
    },
    {
      id: nanoid(),
      label: (
        <ChoiceLabel after={<IoMdReturnLeft />}>Complete encounter</ChoiceLabel>
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

const CombatNode2: EncounterNode = {
  id: nanoid(),
  icon: <IoSkullSharp />,
  title: 'Angry Enemies',
  render: (ctx) => {
    ctx.log(
      <div>
        "Well look who it is, if it isn't some fresh meet for the grinder.
        You've wondered into the wrong neighborhood travelers."
      </div>
    )
    ctx.log(<Narration>You see the group ready their weapons.</Narration>)
    ctx.log(<Separator />)
  },
  choices: () => [
    {
      id: nanoid(),
      label: (
        <ChoiceLabel
          before={
            <ChoiceAttributes>
              <LuSwords />
            </ChoiceAttributes>
          }
          after={<IoMdReturnRight />}
        >
          Begin combat
        </ChoiceLabel>
      ),
      resolve: (ctx) => {
        const enemyTeam: Team = {
          id: TeamId(),
          resources: { credits: 0 },
          items: [],
          maxActiveUnits: 2,
        }
        ctx.initializeCombat({
          enemyTeam,
          enemyUnits: Array.from({ length: 3 }).map(() =>
            makeUnit({ level: 4, teamId: enemyTeam.id }, ENEMY_BASES)
          ),
          commit: true,
          reward: {
            items: [],
            resources: {
              credits: 200,
            },
            xp: 100,
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
      },
    },
  ],
}

export const CombatEncounterId = nanoid()
export function CombatEncounter(): Encounter {
  return {
    id: CombatEncounterId,
    setup: (ctx) => {
      const enemyTeam: Team = {
        id: TeamId(),
        resources: { credits: 0 },
        items: [],
        maxActiveUnits: 2,
      }
      if (ctx.team && ctx.units.length > 0) {
        ctx.initializeCombat({
          enemyTeam,
          enemyUnits: Array.from({ length: 3 }).map(() =>
            makeUnit({ level: 4, teamId: enemyTeam.id }, [
              Wolf,
              Snake,
              RestlessSpirit,
            ])
          ),
          commit: true,
          reward: {
            items: [],
            resources: {
              credits: 200,
            },
            xp: 120,
          },
          modifiers: [
            new UpdateStatTeam({
              registryId: SpeedUpTeamId,
              teamId: ctx.team.id,
              stat: 'speed',
              factor: 0.5,
              duration: 2,
            }),
          ],
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
    nodes: [CombatIntroductionNode, CombatNode2],
    activeNodeId: CombatIntroductionNode.id,
    visitedNodeIds: [],
    values: {},
  }
}
