import { cn } from '@/lib/utils'
import { MODIFIER_BASE_ICONS, ModifierRenderers } from '@/renderers'
import { Modifier } from '@repo/game/types'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { HoverCardPortal } from '@radix-ui/react-hover-card'

export type ModifierIconProps = {
  modifier: Modifier
  fallback: ReactNode
}

export function ModifierIcon(props: ModifierIconProps) {
  const { modifier, fallback } = props
  const renderer = ModifierRenderers[modifier.rid]
  const icons = MODIFIER_BASE_ICONS[modifier.rid]
  if (!icons) return fallback
  const [Icon, Overlay, iconClass, overlayClass] = icons

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[28px] w-[28px] cursor-pointer"
        >
          <Icon size="28px" className={iconClass} />
          {Overlay && (
            <Overlay
              size="24px"
              className={cn('absolute top-2.5 left-2', overlayClass)}
            />
          )}
        </motion.div>
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent className="w-[320px]">
          {renderer?.description && renderer?.description(modifier)}
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
