import { StatRenderers } from '@/renderers/Stats'
import {
  Encounter,
  EncounterChoice,
  EncounterNode,
  Trigger,
} from '@repo/game/types'
import { applyMutations, getModifiersFromUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid/non-secure'
import { GiWaterfall } from 'react-icons/gi'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { ChoiceLabel } from '../ChoiceLabel'
import { Narration } from '../Narration'

const HealingIntroductionNode: EncounterNode = {
  id: nanoid(),
  icon: <GiWaterfall />,
  title: 'Healing Waterfall',
  text: (
    <div className="space-y-4">
      <Narration>
        You encounter a <span>Healing Waterfall</span>. One member of your party
        may use this to heal 100% of their current damage. This cannot revive
        dead units.
      </Narration>
    </div>
  ),
  choices: (ctx) => {
    const aliveUnits = ctx.units
      .map((u) => {
        return applyMutations(
          u,
          getModifiersFromUnit(u).filter((m) => !(m instanceof Trigger))
        )
      })
      .filter((u) => u.stats.health > u.values.damage)
    return [
      ...aliveUnits.map<EncounterChoice>((u) => ({
        id: nanoid(),
        label: (
          <ChoiceLabel
            before={<div>{StatRenderers.health.icon}</div>}
            after={<IoMdReturnRight />}
          >
            Heal {u.name}{' '}
            <span className="font-thin">
              ({u.stats.health - u.values.damage}/{u.stats.health})
            </span>
          </ChoiceLabel>
        ),
        resolve: (ctx) => {
          ctx.updateUnit(u.id, (unit) => ({
            values: {
              ...unit.values,
              damage: 0,
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

export const HealingEncounter: Encounter = {
  id: nanoid(),
  setup: (ctx) => {},
  activeNodeId: HealingIntroductionNode.id,
  nodes: [HealingIntroductionNode],
  values: {},
}
