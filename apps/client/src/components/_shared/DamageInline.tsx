import { cn } from '@/lib/utils'
import { DamageRenderers } from '@/renderers/Damage'
import { ElementProps } from '@/types'
import { TooltipPortal } from '@radix-ui/react-tooltip'
import { Damage } from '@repo/game/types'
import { GiPlainCircle } from 'react-icons/gi'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { DamageIcon } from './DamageIcon'

export type DamageInlineProps = ElementProps<{
  color?: string
  damage: Damage | undefined
  showAttackTypeIndicator?: boolean
}>

export function DamageInline(props: DamageInlineProps) {
  const { damage, color, showAttackTypeIndicator, className } = props
  const renderer = damage?.damageType
    ? DamageRenderers[damage.damageType]
    : undefined

  const isPhysical =
    damage?.attackType === 'physical' ||
    damage?.attackType === 'physical-reverse'
  const isMagic =
    damage?.attackType === 'magic' || damage?.attackType === 'magic-reverse'

  return (
    <span
      className={cn(
        'text-white space-x-1 inline-flex items-baseline',
        className
      )}
      style={{ color: color || renderer?.color }}
    >
      {showAttackTypeIndicator && (
        <Tooltip>
          <TooltipTrigger className="self-center">
            <GiPlainCircle
              className={cn('h-2 w-2 self-center', {
                'fill-green-400': isPhysical,
                'fill-blue-400': isMagic,
              })}
            />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>
              {isPhysical && (
                <span>
                  <span className="font-bold">Physical</span>{' '}
                  <span className="text-muted-foreground">
                    (uses Attack stat)
                  </span>
                </span>
              )}
              {isMagic && (
                <span>
                  <span className="font-bold">Magic</span>{' '}
                  <span className="text-muted-foreground">
                    (uses Magic stat)
                  </span>
                </span>
              )}
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      )}

      {damage && damage.power === Infinity && (
        <div className="text-2xl leading-[20px] max-h-[20px]">∞</div>
      )}
      {damage && !damage.factor && damage.power !== Infinity && (
        <span className="font-black text-lg leading-[20px] num">
          {damage?.power || '--'}
        </span>
      )}
      {damage && damage.factor && (
        <span className="font-bold num">
          {(damage.factor * 100).toFixed(1)}%
        </span>
      )}
      <DamageIcon
        color={color}
        damageType={damage?.damageType}
        className="h-[20px] w-[20px] self-center"
        content={(name) => <>{name} Power</>}
      />
    </span>
  )
}
