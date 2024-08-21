import { faker } from '@faker-js/faker'
import { Encounter, EncounterNode } from '@repo/game/types'
import { makeEnemyUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { Narration } from '../Narration'

const TestNode1: EncounterNode = {
  id: nanoid(),
  title: 'Test Encounter 001',
  text: (
    <div className="space-y-2">
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
        <div className="flex space-x-2 items-center">
          <span>Ambush the enemies</span>
          <IoMdReturnRight />
        </div>
      ),
      resolve: (ctx) => {
        ctx.initializeCombat({
          enemyUnits: Array.from({ length: 3 }).map(() =>
            makeEnemyUnit(faker.person.fullName(), 15)
          ),
          onSuccess: () => {
            ctx.updateActiveWorldNode((n) => ({
              completed: true,
            }))
          },
          onFailure: () => {},
        })
      },
      options: [],
    },
    {
      id: nanoid(),
      label: <div>Get the enemies' attention</div>,
      resolve: (ctx) =>
        ctx.updateEncounter((e) => ({ activeNodeId: TestNode2.id })),
      options: [],
    },
    {
      id: nanoid(),
      label: (
        <div className="flex space-x-2 items-center">
          <IoMdReturnLeft />
          <span>Leave</span>
        </div>
      ),
      resolve: (ctx) => ctx.back(),
      options: [],
    },
    {
      id: nanoid(),
      label: (
        <div className="flex space-x-2 items-center">
          <IoMdReturnLeft />
          <span>Complete encounter</span>
        </div>
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
    <div className="space-y-2">
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
      label: 'Begin combat >>',
      resolve: (ctx) => {
        // TODO: but make it harder
        ctx.initializeCombat({
          enemyUnits: Array.from({ length: 3 }).map(() =>
            makeEnemyUnit(faker.person.fullName(), 15)
          ),
          onSuccess: () => {
            ctx.updateActiveWorldNode((n) => ({
              completed: true,
            }))
          },
          onFailure: () => {},
        })
      },
      options: [],
    },
  ],
}

export const TestEncounterId = nanoid()
export const TestEncounter: Encounter = {
  id: TestEncounterId,
  nodes: [TestNode1, TestNode2],
  activeNodeId: TestNode1.id,
  values: {},
}
