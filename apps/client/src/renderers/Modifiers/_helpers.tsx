import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { PropsWithChildren } from 'react'

type ElementProps<T = {}> = PropsWithChildren<PropsWithClassname<T>>

export function ModifierName(props: ElementProps) {
  return (
    <span className={cn('text-white', props.className)}>{props.children}</span>
  )
}

export function ModifierValues(
  props: ElementProps & { factor: number; static: number }
) {
  return (
    <div>
      {props.factor !== 0 && (
        <div>
          {props.factor > 0 ? '+' : '-'}
          {Math.abs(props.factor) * 100}% {props.children}.
        </div>
      )}
      {props.static !== 0 && (
        <div>
          {props.static > 0 ? '+' : '-'}
          {Math.abs(props.static)} {props.children}.
        </div>
      )}
    </div>
  )
}

export function ModifierValuesPercent(
  props: ElementProps & { factor: number; static: number }
) {
  return (
    <div>
      {props.factor !== 0 && (
        <div>
          ×{props.factor + 1} {props.children}.
        </div>
      )}
      {props.static !== 0 && (
        <div>
          {props.static > 0 ? '+' : ''}
          {props.static * 100}% {props.children}.
        </div>
      )}
    </div>
  )
}

export function TriggerName(props: ElementProps) {
  return (
    <div
      className={cn('opacity-50 uppercase text-sm font-bold', props.className)}
    >
      {props.children}
    </div>
  )
}
