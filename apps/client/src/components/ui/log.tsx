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
        'flex flex-row items-center w-full space-x-2 text-muted-foreground/40 font-bold uppercase overflow-hidden',
        props.className
      )}
    >
      <div className="text-nowrap">{props.children}</div>
      <Separator />
    </div>
  )
}

export function LogSecondary(props: PropsWithChildren) {
  return (
    <span className="pl-4 text-muted-foreground font-thin italic">
      {props.children}
    </span>
  )
}

export function LogUnit(
  props: PropsWithChildren<{ className?: string; teamId?: Id; user: Id }>
) {
  return (
    <span
      className={cn(props.className, {
        'text-log-enemy': props.teamId !== props.user,
        'text-teal-300': props.teamId === props.user,
      })}
    >
      {props.children}
    </span>
  )
}
