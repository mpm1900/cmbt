import { Narration } from '@/components/encounter/Narration'
import { choice } from '@/worlds/_utils'
import { EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { GiGolemHead } from 'react-icons/gi'
import { IoMdReturnLeft } from 'react-icons/io'
import { MdOutlineVpnKey } from 'react-icons/md'

export const GolemEncounterPostCombatId = nanoid()
export const GolemEncounterPostCombat: EncounterNode = {
  id: GolemEncounterPostCombatId,
  icon: <GiGolemHead />,
  title: 'Overgrown Ruins',
  render(ctx, props) {
    ctx.log(
      <Narration>
        The forest is quiet again. Where was laying before, you now see path to
        an undergrown chamber. Unfathomably deep.
      </Narration>
    )
  },
  choices(ctx, props) {
    return [
      choice({
        before: <MdOutlineVpnKey />,
        label: <>Leave the ruins</>,
        after: <IoMdReturnLeft />,
        resolve: (ctx) => {
          ctx.updateActiveWorldNode((n) => ({
            locked: false,
            completed: true,
          }))
          ctx.back()
        },
      }),
    ]
  },
}
