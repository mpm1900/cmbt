import { useScrollToBottom } from '@/hooks'
import { useCombat } from '@/hooks/state'

export function CombatLog() {
  const logs = useCombat((s) => s.logs)
  const ref = useScrollToBottom(logs.length)

  return (
    <div className="overflow-auto">
      {logs.map((log, i) => (
        <div key={i} className="px-2 py-0.5 overflow-hidden">
          {log}
        </div>
      ))}
      <div ref={ref} className="mt-4" />
    </div>
  )
}
