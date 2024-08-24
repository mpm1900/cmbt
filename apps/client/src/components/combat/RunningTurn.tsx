import { useCombat } from '@/hooks/state'
import { ActionRenderers } from '@/renderers'
import { TextList } from '@shared/TextList'
import { LogUnit } from '../ui/log'

export function RunningTurn() {
  const { active, units, user } = useCombat((s) => ({
    active: s.turn.results[s.turn.results.length - 1],
    units: s.units,
    user: s.user,
  }))
  const renderer = ActionRenderers[active?.action?.id ?? '']

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
              <TextList>
                {active?.expandedTargets?.map((t) => (
                  <LogUnit key={t.id} teamId={t.teamId} user={user}>
                    {t.name}
                  </LogUnit>
                ))}
              </TextList>
            </div>
          )}
        </div>
      ) : (
        active && (
          <div>
            <span className="text-3xl">
              <span className="font-black text-white">{renderer?.name}</span>{' '}
              used
            </span>
            {((active.expandedTargets ?? active.targets)?.length ?? 0) > 0 && (
              <div className="text-muted-foreground text-sm">
                on{' '}
                <TextList>
                  {active?.expandedTargets?.map((t) => (
                    <LogUnit key={t.id} teamId={t.teamId} user={user}>
                      {t.name}
                    </LogUnit>
                  ))}
                </TextList>
              </div>
            )}
          </div>
        )
      )}
    </div>
  )
}
