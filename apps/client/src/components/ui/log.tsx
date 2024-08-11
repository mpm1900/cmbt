import { cn } from '@/lib/utils'
import { ActionRenderers } from '@/renderers'
import { Separator } from '@radix-ui/react-separator'
import { Action, Id } from '@repo/game/types'
import { PropsWithChildren } from 'react'

export function LogActionName(props: { action: Action }) {
  const { action } = props
  const renderer = ActionRenderers[action.id]
  return (
    <span
      className={cn({
        'text-blue-300': action.attackType === 'magic',
        'text-green-300': action.attackType === 'physical',
      })}
    >
      {renderer?.name ?? action.id}
    </span>
  )
}

export function LogCritical(props: PropsWithChildren<{ className?: string }>) {
  return <span className="text-red-400">{props.children}</span>
}

export function LogHeader(props: PropsWithChildren<{ className?: string }>) {
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

export function LogSecondary(
  props: PropsWithChildren & { className?: string }
) {
  return (
    <span
      className={cn(
        'pl-4 text-muted-foreground font-thin opacity-65',
        props.className
      )}
    >
      {props.children}
    </span>
  )
}

export function LogUnit(
  props: PropsWithChildren<{ className?: string; teamId?: Id; user: Id }>
) {
  return (
    <span
      className={cn('font-normal', props.className, {
        'text-muted-foreground font-bold': !props.teamId,
        'text-orange-300': props.teamId && props.teamId !== props.user,
        'text-cyan-300': props.teamId === props.user,
      })}
    >
      {props.children}
    </span>
  )
}
