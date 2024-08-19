import { useGame, useUnitBuilders } from '@/hooks/state'
import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { makeWorld } from '@/utils/makeWorld'
import { Potion } from '@repo/game/data'
import { Team } from '@repo/game/types'
import { resolveUnitBuilder } from '@repo/game/utils'
import { useNavigate } from '@tanstack/react-router'
import { nanoid } from 'nanoid'
import { Button } from '../ui/button'

export function StartButton(props: PropsWithClassname) {
  const { className } = props
  const nav = useNavigate()
  const game = useGame()
  const store = useUnitBuilders()

  function initialize() {
    const team: Team = {
      id: nanoid(),
      items: [Potion(), { id: nanoid(), name: 'null', count: 1, cost: 0 }],
      resources: {
        credits: 1500,
      },
    }
    const world = makeWorld()
    game.initialize({
      team,
      units: store.builders.map((b) => resolveUnitBuilder(b, team.id)),
      world,
    })
  }

  const unitsHaveActions = store.builders.every((b) => b.actions.length > 0)

  return (
    <Button
      variant="destructive"
      className={cn('w-full', className)}
      disabled={!unitsHaveActions}
      onClick={() => {
        initialize()
        nav({ to: '/world' })
      }}
    >
      Start!
    </Button>
  )
}
