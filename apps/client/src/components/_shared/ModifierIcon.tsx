import { cn } from '@/lib/utils'
import { MODIFIER_BASE_ICONS } from '@/renderers'
import { Modifier } from '@repo/game/types'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { ModifierHover } from './ModifierHover'

export type ModifierIconProps = {
  modifier: Modifier
  side?: 'top' | 'right' | 'bottom' | 'left'
  fallback: ReactNode
}

export function ModifierIcon(props: ModifierIconProps) {
  const { modifier, fallback, side } = props
  const icons = MODIFIER_BASE_ICONS[modifier.rid]
  if (!icons) return fallback
  const [
    Icon,
    Overlay,
    iconClass,
    overlayClass,
    overlaySize,
    overlayOffset = [],
  ] = icons

  return (
    <ModifierHover side={side} modifier={modifier}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[28px] w-[28px] cursor-pointer"
      >
        <Icon size="28px" className={iconClass} />
        {Overlay && (
          <Overlay
            size={overlaySize || '24px'}
            className={cn(`absolute`, overlayClass, {
              'top-2.5 left-2': overlayOffset.length === 0,
            })}
            style={{
              right: overlayOffset[0] + 'px',
              bottom: overlayOffset[1] + 'px',
            }}
          />
        )}
      </motion.div>
    </ModifierHover>
  )
}
