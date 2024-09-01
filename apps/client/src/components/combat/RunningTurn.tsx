import { useCombat } from '@/hooks/state'
import { ActionRenderers } from '@/renderers'
import { TextList } from '@shared/TextList'
import { LogUnit } from '../ui/log'

export function RunningTurn() {
  const { result, units, user } = useCombat((s) => ({
    result: s.turn.results[s.turn.results.length - 1],
    units: s.units,
    user: s.user,
  }))
  const renderer = ActionRenderers[result?.action?.id ?? '']
  const logTargets = result?.expandedTargets ?? result?.targets ?? []
  console.log(result)

  return (
    <div>
      {result && result.data?.source ? (
        <div>
          <div className="text-3xl text-muted-foreground">
            <LogUnit
              user={user}
              teamId={result.data.source.teamId}
              className="font-thin opacity-60"
            >
              {result.data.source.name}
            </LogUnit>{' '}
            uses <span className="font-black text-white">{renderer?.name}</span>
          </div>
          {logTargets.length > 0 && (
            <div className="text-muted-foreground text-sm">
              on{' '}
              <TextList>
                {logTargets.map((t) => (
                  <LogUnit key={t.id} teamId={t.teamId} user={user}>
                    {t.name}
                  </LogUnit>
                ))}
              </TextList>
            </div>
          )}
        </div>
      ) : (
        result && (
          <div>
            <span className="text-3xl">
              <span className="font-black text-white">{renderer?.name}</span>{' '}
              used
            </span>
            {logTargets.length > 0 && (
              <div className="text-muted-foreground text-sm">
                on{' '}
                <TextList>
                  {logTargets.map((t) => (
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
