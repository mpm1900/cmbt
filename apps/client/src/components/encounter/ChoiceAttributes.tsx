import { cn } from '@/lib/utils'
import { ElementProps } from '@/types'

export function ChoiceAttributes(props: ElementProps) {
  return (
    <div className={cn('flex items-center space-x-1', props.className)}>
      <div>[</div>
      {props.children}
      <div>]</div>
    </div>
  )
}
