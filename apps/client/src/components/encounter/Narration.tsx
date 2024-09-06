import { cn } from '@/lib/utils'
import { ElementProps } from '@/types'

export type NarrationProps = ElementProps

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
