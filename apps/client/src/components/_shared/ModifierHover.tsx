import { ModifierRenderers } from '@/renderers'
import { HoverCardPortal } from '@radix-ui/react-hover-card'
import { Modifier, Trigger } from '@repo/game/types'
import { PropsWithChildren } from 'react'
import { FaHourglassStart } from 'react-icons/fa6'
import { RxLapTimer } from 'react-icons/rx'
import { SiPersistent } from 'react-icons/si'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { ModifierDescription } from './ModifierDescription'

export type ModifierHoverProps = PropsWithChildren<{
  modifier: Modifier
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function ModifierHover(props: ModifierHoverProps) {
  const { modifier, side, children } = props
  const renderer =
    ModifierRenderers[modifier.registryId] || ModifierRenderers[modifier.id]
  return (
    <TooltipProvider>
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger asChild>{children}</HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent
            side={side}
            collisionPadding={16}
            className="w-[320px]"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>{renderer?.name(modifier)}</div>
                <div className="font-black text-xs uppercase text-muted-foreground/40">
                  {modifier instanceof Trigger ? 'Trigger' : 'Modifier'}
                </div>
              </div>
              <ModifierDescription modifier={modifier} />
              <div className="text-xs font-bold text-muted-foreground/60 text-right space-x-4 flex flex-row justify-end items-center">
                {modifier.persistOnCombatEnd && modifier.persistOnSwitch && (
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger>
                      <SiPersistent />
                    </TooltipTrigger>
                    <TooltipContent>Persists after combat</TooltipContent>
                  </Tooltip>
                )}
                {!modifier.persistOnCombatEnd && modifier.persistOnSwitch && (
                  <SiPersistent />
                )}
                {!!modifier.duration && (
                  <div className="flex items-center space-x-1">
                    <FaHourglassStart />
                    <span>
                      {modifier.duration} turn{modifier.duration > 1 && 's'}
                    </span>
                  </div>
                )}
                {modifier.delay !== undefined && (
                  <div className="flex items-center space-x-1">
                    <RxLapTimer />
                    <span>
                      {modifier.delay} turn{modifier.delay > 1 && 's'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>
    </TooltipProvider>
  )
}
