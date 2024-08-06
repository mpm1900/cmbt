import { useCombat } from '@/hooks/state'

export function CombatLog() {
  const logs = useCombat((s) => s.logs)

  return (
    <div className="overflow-auto">
      {logs.map((log, i) => (
        <div key={i} className="px-2 py-0.5 overflow-hidden">
          {log}
        </div>
      ))}
    </div>
  )
}
