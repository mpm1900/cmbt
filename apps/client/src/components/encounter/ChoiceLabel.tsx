import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { PropsWithChildren, ReactNode } from 'react'

export type ChoiceLabelProps = PropsWithChildren<
  PropsWithClassname<{
    before?: ReactNode
    after?: ReactNode
  }>
>

export function ChoiceLabel(props: ChoiceLabelProps) {
  return (
    <div className={cn('flex space-x-2 items-center', props.className)}>
      {props.before}
      <div>{props.children}</div>
      {props.after}
    </div>
  )
}
