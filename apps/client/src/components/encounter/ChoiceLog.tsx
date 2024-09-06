import { cn } from '@/lib/utils'
import { ElementProps } from '@/types'

export function ChoiceLog(props: ElementProps) {
  return (
    <span className={cn('space-x-2 text-muted-foreground', props.className)}>
      <span>{'>>>'}</span>
      <span>{props.children}</span>
    </span>
  )
}
