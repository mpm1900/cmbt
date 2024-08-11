import { useCombat } from '@/hooks/state'
import { ActionRenderers } from '@/renderers'

export function RunningTurn() {
  const { active } = useCombat((s) => ({
    active: s.turn.results[s.turn.results.length - 1],
  }))
  const renderer = ActionRenderers[active?.action?.id ?? '']

  return (
    <div>
      {active && active.data?.source && (
        <span className="text-3xl">
          {active.data?.source.name} uses {renderer?.name}
        </span>
      )}
    </div>
  )
}
