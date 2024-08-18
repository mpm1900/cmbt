import { useCombat } from '@/hooks/state'
import { ActionRenderers } from '@/renderers'
import { LogUnit } from '../ui/log'

export function RunningTurn() {
  const { active, units, user } = useCombat((s) => ({
    active: s.turn.results[s.turn.results.length - 1],
    units: s.units,
    user: s.user,
  }))
  const renderer = ActionRenderers[active?.action?.id ?? '']
  console.log(active?.expandedTargets)

  return (
    <div>
      {active && active.data?.source ? (
        <div>
          <div className="text-3xl text-muted-foreground">
            <LogUnit
              user={user}
              teamId={active.data.source.teamId}
              className="font-thin opacity-60"
            >
              {active.data.source.name}
            </LogUnit>{' '}
            uses <span className="font-black text-white">{renderer?.name}</span>
          </div>
          {(active.expandedTargets?.length ?? 0) > 0 && (
            <div className="text-muted-foreground text-sm">
              on{' '}
              {active?.expandedTargets?.map((t, i, a) => (
                <>
                  {a.length > 1 && i === a.length - 1 && ' and '}
                  <LogUnit teamId={t.teamId} user={user}>
                    {t.name}
                  </LogUnit>
                  {a.length > 1 && i !== a.length - 1 && ', '}
                </>
              ))}
            </div>
          )}
        </div>
      ) : (
        <span className="text-3xl">
          {renderer?.name} used on {active?.expandedTargets?.map((t) => t.name)}
        </span>
      )}
    </div>
  )
}
