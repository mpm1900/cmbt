import { cn } from '@/lib/utils'
import { ElementProps } from '@/types'
import { ReactNode } from 'react'

export type QuoteProps = ElementProps<{
  name: ReactNode
}>

export function Quote(props: QuoteProps) {
  return (
    <span className={cn('space-x-2', props.className)}>
      <span className="text-muted-foreground">{props.name}</span>:{' '}
      {props.children}
    </span>
  )
}
