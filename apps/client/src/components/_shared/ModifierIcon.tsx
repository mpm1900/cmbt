import { cn } from '@/lib/utils'
import { MODIFIER_ICONS } from '@/renderers'
import { PropsWithClassname } from '@/types'
import { Modifier } from '@repo/game/types'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { ModifierHover } from './ModifierHover'

export type ModifierIconProps = PropsWithClassname<{
  modifier: Modifier
  side?: 'top' | 'right' | 'bottom' | 'left'
  fallback: ReactNode
}>

export function ModifierIcon(props: ModifierIconProps) {
  const { modifier, fallback, side, className } = props
  const ModIcon = MODIFIER_ICONS[modifier.registryId]
  if (!ModIcon) return fallback
  return (
    <ModifierHover side={side} modifier={modifier}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn('relative h-[28px] w-[28px] cursor-pointer', className)}
      >
        {ModIcon}
      </motion.div>
    </ModifierHover>
  )
}
