import { cn } from '@/lib/utils'
import { ElementProps } from '@/types'

export function ChoiceAttributes(props: ElementProps) {
  return (
    <div className={cn('flex items-center space-x-1', props.className)}>
      <div className="font-bold">[</div>
      <div className="flex items-center space-x-1">{props.children}</div>
      <div className="font-bold">]</div>
    </div>
  )
}
