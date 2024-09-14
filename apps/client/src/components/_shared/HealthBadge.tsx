import { cn } from '@/lib/utils'
import { StatRenderers } from '@/renderers/Stats'
import { ElementProps } from '@/types'
import { Badge } from '../ui/badge'

export type HealthBadgeProps = ElementProps

export function HealthBadge(props: ElementProps) {
  const { children, className } = props

  return (
    <Badge
      variant="outline"
      className={cn(
        'space-x-1 px-1 bg-red-500 text-white items-center num h-[22px]',
        className
      )}
    >
      <div>{StatRenderers.health.icon}</div>
      {children && <span>{children}</span>}
    </Badge>
  )
}
