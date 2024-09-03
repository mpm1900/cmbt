import { useScrollToView } from '@/hooks'
import { useCombat } from '@/hooks/state'
import { useRef } from 'react'
import { CombatLogItem } from './CombatLogItem'

export function CombatLog() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { logs, updateLog } = useCombat((s) => ({
    logs: s.logs,
    updateLog: s.updateLog,
  }))

  const ref = useScrollToView(containerRef.current, logs.length)

  return (
    <div
      ref={containerRef}
      className="overflow-auto h-full"
      style={{
        scrollBehavior: 'smooth',
      }}
    >
      <div className="pb-4">
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
        <div ref={ref} />
      </div>
    </div>
  )
}
