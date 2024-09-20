import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { Narration } from '@/components/encounter/Narration'
import { Quote } from '@/components/encounter/Quote'
import { choice } from '@/worlds/_utils'
import { MysteriousOrbKey } from '@repo/game/data'
import { EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import random from 'random'
import { GiGolemHead } from 'react-icons/gi'
import { IoMdReturnLeft } from 'react-icons/io'
import { GolemEncounterPreCombatId } from './GolemEncounterPreCombat'

export const GolemEncounterStartId = nanoid()
export const GolemEncounterStart: EncounterNode = {
  id: GolemEncounterStartId,
  icon: <GiGolemHead />,
  title: 'Overgrown Ruins',
  render(ctx, props) {
    ctx.log(
      <Narration>Your party find some overgrown ruins in the forest.</Narration>
    )
    ctx.log(
      <Narration>
        All seems still, peaceful even. In the vastness of the forest, it's not
        uncommon to find places untouched by humans for centuries. However, this
        place is different.
      </Narration>
    )

    if (ctx.encounter.values.ruinsPerceptionCheck === 0) {
      const difficulty = 50
      const roll = random.int(0, 100)
      const success = difficulty >= roll
      if (success) {
        ctx.log(
          <div className="flex space-x-4">
            <ChoiceAttributes>Perception Success</ChoiceAttributes>
            <Narration>
              You sense latent power here. But it lacks a conduit.
            </Narration>
          </div>
        )
      }
      ctx.updateEncounter((e) => ({
        values: {
          ruinsPerceptionCheck: 1,
        },
      }))
    }

    if (ctx.team?.items.find((i) => i.key === MysteriousOrbKey)) {
      ctx.log(
        <Narration>
          You feel raw energy radiating from the mysterious orb in your pack.
        </Narration>
      )
    }
  },
  choices(ctx, props) {
    return [
      choice({
        filter: ctx.team?.items.some((i) => i.key === MysteriousOrbKey),
        label: <>Place the mysterious orb in the center of the ruins.</>,
        action: true,
        to: GolemEncounterPreCombatId,
        resolve: (ctx) => {
          ctx.log(
            <Narration>
              You see the ruins hum to life. What appeared to be overgrowth,
              stands up before you. An ancient golem, brought back to life by
              the conduit you placed.
            </Narration>
          )
          ctx.log(<Quote name="Ancient Golem">[indiscernable noises]</Quote>)
        },
      }),
      choice({
        label: <>Leave</>,
        action: true,
        after: <IoMdReturnLeft />,
        back: true,
      }),
    ]
  },
}
