import { useScrollToView } from '@/hooks'
import { useCombat } from '@/hooks/state'
import { CombatLogItem } from './CombatLogItem'

export function CombatLog() {
  const { logs, updateLog } = useCombat((s) => ({
    logs: s.logs,
    updateLog: s.updateLog,
  }))

  const ref = useScrollToView(logs.length)

  return (
    <div className="overflow-auto h-full">
      {logs.map((log) => (
        <CombatLogItem
          key={log.id}
          node={log.node}
          delay={log.delay}
          onAnimationComplete={(def) =>
            updateLog(log.id, (l) => ({ delay: 0 }))
          }
        />
      ))}
      <div ref={ref} className="mt-4" />
    </div>
  )
}
