import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { PropsWithChildren } from 'react'

export type NarrationProps = PropsWithChildren<PropsWithClassname<{}>>

export function Narration(props: NarrationProps) {
  return (
    <span
      {...props}
      className={cn(
        'text-muted-foreground/80 font-thin italic',
        props.className
      )}
    />
  )
}
