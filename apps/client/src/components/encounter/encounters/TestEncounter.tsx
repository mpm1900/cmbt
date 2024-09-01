import { faker } from '@faker-js/faker'
import { SpeedUpTeam, TeamId } from '@repo/game/data'
import { Encounter, EncounterNode, Team } from '@repo/game/types'
import { makeEnemyUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { GiCrossedSwords } from 'react-icons/gi'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { ChoiceLabel } from '../ChoiceLabel'
import { Narration } from '../Narration'

const TestNode1: EncounterNode = {
  id: nanoid(),
  title: 'Test Encounter 001',
  text: (
    <div className="space-y-4">
      <Narration>
        Ahead of you stands a group of enemies. They don't seem to have noticed
        you yet.
      </Narration>

      <div>What will you do?</div>
    </div>
  ),
  choices: () => [
    {
      id: nanoid(),
      label: (
        <ChoiceLabel before={<GiCrossedSwords />} after={<IoMdReturnRight />}>
          Ambush the enemies
        </ChoiceLabel>
      ),
      resolve: (ctx) => {
        const enemyTeam: Team = {
          id: TeamId(),
          resources: { credits: 0 },
          items: [],
        }
        const unit = ctx.units.find((u) => true)
        ctx.initializeCombat({
          enemyTeam,
          enemyUnits: Array.from({ length: 3 }).map(() =>
            makeEnemyUnit(faker.person.fullName(), enemyTeam.id, 15)
          ),
          modifiers: [
            new SpeedUpTeam({
              sourceId: unit?.id,
              parentId: unit?.id,
              factor: 1.5,
              duration: 2,
            }),
          ],
          onSuccess: () => {
            ctx.updateActiveWorldNode((n) => ({
              completed: true,
            }))
          },
          onFailure: () => {},
        })
      },
    },
    {
      id: nanoid(),
      label: <div>Get the enemies' attention</div>,
      resolve: (ctx) =>
        ctx.updateEncounter((e) => ({ activeNodeId: TestNode2.id })),
    },
    {
      id: nanoid(),
      label: <ChoiceLabel after={<IoMdReturnLeft />}>Leave</ChoiceLabel>,
      resolve: (ctx) => ctx.back(),
    },
    {
      id: nanoid(),
      label: (
        <ChoiceLabel after={<IoMdReturnLeft />}>Complete encounter</ChoiceLabel>
      ),
      resolve: (ctx) => {
        ctx.updateActiveWorldNode((n) => ({
          completed: true,
        }))
        ctx.back()
      },
    },
  ],
}

const TestNode2: EncounterNode = {
  id: nanoid(),
  title: 'Test Encounter 001',
  text: (
    <div className="space-y-4">
      <div>
        "Well look who it is, if it isn't some fresh meet for the grinder.
        You've wondered into the wrong neighborhood travelers."
      </div>
      <div>
        <Narration>You see the group ready their weapons.</Narration>
      </div>
    </div>
  ),
  choices: () => [
    {
      id: nanoid(),
      label: (
        <ChoiceLabel before={<GiCrossedSwords />} after={<IoMdReturnRight />}>
          Begin combat
        </ChoiceLabel>
      ),
      resolve: (ctx) => {
        // TODO: but make it harder
        const enemyTeam: Team = {
          id: TeamId(),
          resources: { credits: 0 },
          items: [],
        }
        ctx.initializeCombat({
          enemyTeam,
          enemyUnits: Array.from({ length: 3 }).map(() =>
            makeEnemyUnit(faker.person.fullName(), enemyTeam.id, 15)
          ),
          onSuccess: () => {
            ctx.updateActiveWorldNode((n) => ({
              completed: true,
            }))
          },
          onFailure: () => {},
        })
      },
    },
  ],
}

export const TestEncounterId = nanoid()
export const TestEncounter: Encounter = {
  id: TestEncounterId,
  setup: () => {},
  nodes: [TestNode1, TestNode2],
  activeNodeId: TestNode1.id,
  values: {},
}
