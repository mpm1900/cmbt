import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { PropsWithChildren } from 'react'
import { FaShieldHalved } from 'react-icons/fa6'
import { Badge } from '../ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

export function MagicArmor({
  children,
  className,
}: PropsWithChildren<PropsWithClassname>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="outline"
            className={cn('space-x-1 px-1 bg-blue-600 text-white', className)}
          >
            <FaShieldHalved />
            <span>{children}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Magic Armor</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
