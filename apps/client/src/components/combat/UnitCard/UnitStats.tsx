import { Button } from '../../ui/button'
import { StatDebug } from '../StatDebug'
import { ActionsQueueItem, Unit } from '@repo/game/types'
import { RequireTurnStatus } from '../RequireTurnStatus'
import { applyModifiers } from '@repo/game/utils'
import { useCombatContext } from '@/hooks'
import { ActionRenderers } from '@/renderers'

export type UnitStatsProps = {
  unit: Unit
  stagedItem: ActionsQueueItem | undefined
  onClearClick: () => void
}

export function UnitStats(props: UnitStatsProps) {
  const { stagedItem, onClearClick } = props
  const ctx = useCombatContext()
  const { unit } = applyModifiers(props.unit, ctx)
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)

  return (
    <div>
      <div className="flex text-left space-x-4">
        <div>
          <div className="flex justify-between space-x-2">
            <strong>HP</strong>
            <span>
              ({remainingHealth}/{unit.stats.health})
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            <strong>FP</strong>
            <span>
              ({Math.max(unit.values.focus, 0)}/{unit.stats.focus})
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            <strong>SP</strong>
            <span>
              ({Math.max(unit.values.stamina, 0)}/{unit.stats.stamina})
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            <strong>DV</strong>
            <span>
              ({Math.max(unit.values.devotion, 0)}/{unit.stats.devotion})
            </span>
          </div>
          <div>
            <div className="flex justify-between space-x-2">
              <strong>Physical</strong>
              <StatDebug stat="physical" unit={unit} comp={props.unit} />
            </div>
            <div className="flex justify-between space-x-2">
              <strong>Defense</strong>
              <StatDebug stat="defense" unit={unit} comp={props.unit} />
            </div>
            <div className="flex justify-between space-x-2">
              <strong>Magic</strong>
              <StatDebug stat="magic" unit={unit} comp={props.unit} />
            </div>
            <div className="flex justify-between space-x-2">
              <strong>Speed</strong>
              <StatDebug stat="speed" unit={unit} comp={props.unit} />
            </div>
          </div>
        </div>
        <div className="flex flex-1 space-x-4">
          <div className="flex flex-col text-left flex-1">
            <div>Damage</div>

            <div className="flex space-x-4 justify-between">
              <strong className="text-muted-foreground">Arcane</strong>
              <StatDebug
                stat="arcaneExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
            </div>
            <div className="flex space-x-4 justify-between">
              <strong className="text-muted-foreground">Blunt</strong>
              <StatDebug
                stat="bluntExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
            </div>
            <div className="flex space-x-4 justify-between">
              <strong className="text-muted-foreground">Fire</strong>
              <StatDebug
                stat="fireExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
            </div>
            <div className="flex space-x-4 justify-between">
              <strong className="text-muted-foreground">Force</strong>
              <StatDebug
                stat="forceExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
            </div>
            <div className="flex space-x-4 justify-between">
              <strong className="text-muted-foreground">Shock</strong>
              <StatDebug
                stat="shockExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
            </div>
            <div className="flex space-x-4 justify-between">
              <strong className="text-muted-foreground">Slash</strong>
              <StatDebug
                stat="slashExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
            </div>
            <div className="flex space-x-4 justify-between">
              <strong className="text-muted-foreground">Thrust</strong>
              <StatDebug
                stat="thrustExpansion"
                unit={unit}
                comp={props.unit}
                map={(v) => (v + 1) * 100}
              />
            </div>
          </div>
          <div className="flex flex-col text-left flex-1">
            <div>Negation</div>
            <div className="flex space-x-4 justify-between">
              <strong className="text-muted-foreground">Fire</strong>
              <StatDebug
                stat="fireNegation"
                unit={unit}
                comp={props.unit}
                map={(v) => v * 100}
              />
            </div>
            <div className="flex space-x-4 justify-between">
              <strong className="text-muted-foreground">Force</strong>
              <StatDebug
                stat="forceNegation"
                unit={unit}
                comp={props.unit}
                map={(v) => v * 100}
              />
            </div>
            <div className="flex space-x-4 justify-between">
              <strong className="text-muted-foreground">Shock</strong>
              <StatDebug
                stat="shockNegation"
                unit={unit}
                comp={props.unit}
                map={(v) => v * 100}
              />
            </div>
          </div>
        </div>
      </div>
      {stagedItem && (
        <span>
          {`${ActionRenderers[stagedItem.action.id ?? '']?.name} => [${ctx.units
            .filter((u) => stagedItem.targetIds.includes(u.id))
            .map((u) => u.name)
            .join(',')}]`}
          <RequireTurnStatus status="waiting-for-input">
            <a onClick={onClearClick}>[ Clear ]</a>
          </RequireTurnStatus>
        </span>
      )}
    </div>
  )
}
