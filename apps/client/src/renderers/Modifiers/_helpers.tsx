import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { PropsWithChildren, ReactNode } from 'react'

type ElementProps<T = {}> = PropsWithChildren<PropsWithClassname<T>>

export function ModifierName(props: ElementProps) {
  return (
    <span className={cn('text-white', props.className)}>{props.children}</span>
  )
}

export function ModifierValues(
  props: ElementProps & { factor: number; static: number; after?: ReactNode }
) {
  return (
    <div>
      {props.factor !== 0 && (
        <div>
          <span className="num">
            {props.factor > 0 ? '+' : '-'}
            {Math.abs(props.factor) * 100}%{props.after}
          </span>{' '}
          {props.children}
        </div>
      )}
      {props.static !== 0 && (
        <div>
          <span className="num">
            {props.static > 0 ? '+' : '-'}
            {Math.abs(props.static)}
            {props.after}
          </span>{' '}
          {props.children}
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
