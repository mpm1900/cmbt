import { PropsWithChildren } from 'react'
import { Badge } from '../ui/badge'
import { FaShieldHalved } from 'react-icons/fa6'

export function MagicArmor({ children }: PropsWithChildren) {
  return (
    <Badge variant="outline" className="space-x-1 bg-blue-600 text-white">
      <FaShieldHalved />
      <span>{children}</span>
    </Badge>
  )
}
