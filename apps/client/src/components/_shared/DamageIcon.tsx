import { cn } from '@/lib/utils'
import { DamageRenderers } from '@/renderers/Damage'
import { PropsWithClassname } from '@/types'
import { DamageType } from '@repo/game/types'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

export type DamageIconProps = PropsWithClassname<{
  damageType: DamageType | undefined
}>

export function DamageIcon(props: DamageIconProps) {
  const { className, damageType } = props
  const renderer = damageType ? DamageRenderers[damageType] : undefined
  const icon = renderer?.icon
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className={cn(className)} style={{ fill: renderer?.color }}>
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>{renderer?.name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
