import { useTurn } from '@/hooks/state'
import { ActionRenderers } from '@/renderers'

export function RunningTurn() {
  const { active } = useTurn((s) => ({
    active: s.turn.results[s.turn.results.length - 1],
  }))
  const renderer = ActionRenderers[active?.action?.id ?? '']

  return (
    <div>
      {active && active.data?.source && (
        <h1>
          {active.data?.source.name} uses {renderer?.name}
        </h1>
      )}
    </div>
  )
}
