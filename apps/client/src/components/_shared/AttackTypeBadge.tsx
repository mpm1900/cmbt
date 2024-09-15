import { cn } from '@/lib/utils'
import { ElementProps } from '@/types'
import { AttackType } from '@repo/game/types'
import { Badge } from '../ui/badge'

export type AttackTypeBadgeProps = ElementProps<{
  attackType: AttackType
}>

export function AttackTypeBadge(props: AttackTypeBadgeProps) {
  const { attackType, children, className } = props

  return (
    <Badge
      className={cn(
        'border-none uppercase py-0 px-1 min-h-5 hover:text-white',
        {
          'bg-blue-600 text-blue-200': attackType === 'magic',
          'bg-green-600 text-green-100': attackType === 'physical',
        },
        className
      )}
      style={{ fontSize: '0.6rem' }}
      variant="outline"
    >
      {children ?? attackType}
    </Badge>
  )
}
