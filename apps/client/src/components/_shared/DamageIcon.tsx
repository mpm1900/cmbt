import { cn } from '@/lib/utils'
import { DamageRenderers } from '@/renderers/Damage'
import { PropsWithClassname } from '@/types'
import { TooltipPortal } from '@radix-ui/react-tooltip'
import { DamageType } from '@repo/game/types'
import { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export type DamageIconProps = PropsWithClassname<{
  color?: string
  damageType: DamageType | undefined
  content?: (name: ReactNode) => ReactNode
}>

export function DamageIcon(props: DamageIconProps) {
  const { className, color, damageType, content } = props
  const renderer = damageType ? DamageRenderers[damageType] : undefined
  const icon = renderer?.icon
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <div
          className={cn(className)}
          style={{ fill: color || renderer?.color }}
        >
          {icon}
        </div>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>
          {content ? content(renderer?.name) : renderer?.name}
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  )
}
