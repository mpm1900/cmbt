import { useScrollToView } from '@/hooks'
import { useEncounter } from '@/hooks/state/useEncounter'
import { useRef } from 'react'

export function EncounterLogRenderer() {
  const { logs } = useEncounter()
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useScrollToView(containerRef.current, logs.length)

  return (
    <div
      className="max-h-[240px] w-full overflow-auto"
      ref={containerRef}
      style={{
        scrollBehavior: 'smooth',
      }}
    >
      <div className="space-y-4">
        {logs.map((logItem) => (
          <div key={logItem.id}>{logItem.node}</div>
        ))}
        <div ref={ref} />
      </div>
    </div>
  )
}
