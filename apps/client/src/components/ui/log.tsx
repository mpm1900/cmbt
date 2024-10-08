import { useCombatUi } from '@/hooks/state'
import { cn } from '@/lib/utils'
import { ActionRenderers } from '@/renderers'
import { PropsWithClassname } from '@/types'
import { Action, Id, Unit } from '@repo/game/types'
import { getAttackTypesFromDamages } from '@repo/game/utils'
import { ActionHover } from '@shared/ActionHover'
import { PropsWithChildren } from 'react'

type ElementProps<T = {}> = PropsWithChildren<PropsWithClassname<T>>

export function LogTriggerName(props: ElementProps) {
  return (
    <div
      className={cn(
        'flex flex-row items-center space-x-2 text-muted-foreground/40 uppercase',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

export function LogActionName(props: { action: Action }) {
  const { action } = props
  const renderer = ActionRenderers[action.id]
  const attackTypes = getAttackTypesFromDamages(action.damages)
  return (
    <ActionHover action={action} side="left">
      <span
        className={cn('hover:underline cursor-pointer text-white', {
          'text-blue-300': attackTypes.includes('magic'),
          'text-green-300': attackTypes.includes('physical'),
        })}
      >
        {renderer?.name ?? action.id}
      </span>
    </ActionHover>
  )
}

export function LogCritical(props: ElementProps) {
  return <span className="text-red-400">{props.children}</span>
}

export function LogHeader(props: ElementProps) {
  return (
    <div
      className={cn(
        'flex flex-row items-center w-full space-x-2 text-lg text-muted-foreground/40 font-bold uppercase',
        props.className
      )}
    >
      <div className="text-nowrap">{props.children}</div>
      <div
        className="h-4 bg-muted-foreground/20 flex-1"
        style={{ marginRight: -8 }}
      />
    </div>
  )
}

export function LogSecondary(props: ElementProps) {
  return (
    <div
      className={cn(
        'pl-8 indent-[-16px] text-muted-foreground font-thin opacity-65',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

export function LogUnit(props: ElementProps<{ unit: Unit; user: Id }>) {
  const { setHoverTargetUnitIds } = useCombatUi()
  return (
    <span
      onMouseEnter={() => setHoverTargetUnitIds([props.unit.id])}
      onMouseLeave={() => setHoverTargetUnitIds(undefined)}
      className={cn(
        'font-normal hover:underline cursor-pointer',
        props.className,
        {
          'text-muted-foreground font-bold': !props.unit.teamId,
          'text-orange-300':
            props.unit.teamId && props.unit.teamId !== props.user,
          'text-cyan-300': props.unit.teamId === props.user,
        }
      )}
    >
      {props.children}
    </span>
  )
}
