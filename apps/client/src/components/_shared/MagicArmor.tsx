import { PropsWithChildren } from 'react'
import { Badge } from '../ui/badge'
import { FaShieldHalved } from 'react-icons/fa6'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

export function MagicArmor({ children }: PropsWithChildren) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="outline"
            className="space-x-1 px-1 bg-blue-600 text-white"
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
