import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { PropsWithChildren, ReactNode } from 'react'

export type ChoiceLabelProps = PropsWithChildren<
  PropsWithClassname<{
    action?: boolean
    before?: ReactNode
    after?: ReactNode
  }>
>

export function ChoiceLabel(props: ChoiceLabelProps) {
  const { action, before, after, className, children } = props

  return (
    <div className={cn('flex space-x-2 items-center', className)}>
      {before}
      <div className={cn({ italic: action })}>{children}</div>
      {after}
    </div>
  )
}
