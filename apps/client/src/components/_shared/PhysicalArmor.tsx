import { PropsWithChildren } from 'react'
import { FaShieldHalved } from 'react-icons/fa6'
import { Badge } from '../ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

export function PhysicalArmor({ children }: PropsWithChildren) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="outline"
            className="space-x-1 px-1 bg-green-600 text-white"
          >
            <FaShieldHalved />
            <span>{children}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Physical Armor</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
