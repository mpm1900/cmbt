import { cn } from '@/lib/utils'
import { MODIFIER_BASE_ICONS } from '@/renderers'
import { Modifier } from '@repo/game/types'
import { ReactNode } from 'react'

export type ModifierIconProps = {
  modifier: Modifier
  fallback: ReactNode
}

export function ModifierIcon(props: ModifierIconProps) {
  const { modifier, fallback } = props
  const icons = MODIFIER_BASE_ICONS[modifier.rid]
  if (!icons) return fallback
  const [Icon, Overlay, iconClass, overlayClass] = icons

  return (
    <div className="relative" style={{ height: 32, width: 32 }}>
      <Icon size="32px" className={iconClass} />
      {Overlay && (
        <Overlay
          size="32px"
          className={cn('absolute top-2 left-1', overlayClass)}
        />
      )}
    </div>
  )
}
