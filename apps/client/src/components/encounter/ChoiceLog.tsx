import { cn } from '@/lib/utils'
import { ElementProps } from '@/types'
import { TbChevronsRight } from 'react-icons/tb'

export function ChoiceLog(props: ElementProps) {
  return (
    <div
      className={cn(
        'flex items-center space-x-2 text-muted-foreground italic',
        props.className
      )}
    >
      <TbChevronsRight />
      <span>{props.children}</span>
    </div>
  )
}
