import { WORLD_NODE_COLORS } from '@/constants/world'
import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { AccordionContent } from '@radix-ui/react-accordion'
import { PropsWithChildren, ReactNode } from 'react'
import { BsQuestionLg } from 'react-icons/bs'
import { GiPayMoney } from 'react-icons/gi'
import { IoArrowForwardCircleOutline, IoSkullSharp } from 'react-icons/io5'
import { Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion'

function Color(
  props: PropsWithChildren<PropsWithClassname<{ color: string }>>
) {
  return (
    <div className="flex space-x-2 items-center">
      <div
        className={cn('rounded h-[24px] w-[24px]', props.className)}
        style={{ backgroundColor: props.color }}
      />
      <div className="text-muted-foreground">{props.children}</div>
    </div>
  )
}

function Icon(
  props: PropsWithChildren<PropsWithClassname> & { icon: ReactNode }
) {
  return (
    <div className="flex space-x-2 items-center">
      {props.icon}
      <div className="text-muted-foreground">{props.children}</div>
    </div>
  )
}

export function WorldLegend() {
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['colors', 'icons']}
    >
      <AccordionItem value="colors">
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <Color color={WORLD_NODE_COLORS.IsActiveSelectable}>
              Current Location and Selectable
            </Color>
            <Color color={WORLD_NODE_COLORS.IsActiveUnselectable}>
              Current Location and Unselectable
            </Color>
            <Color color={WORLD_NODE_COLORS.IsLockedSelectable}>
              Locked and Selectable
            </Color>
            <Color color={WORLD_NODE_COLORS.IsNotCompleteSelectable}>
              Selectable and Not Completed
            </Color>
            <Color color={WORLD_NODE_COLORS.IsCompleteSelectable}>
              Selectable and Completed
            </Color>
            <Color
              color={WORLD_NODE_COLORS.IsUnselectable}
              className="opacity-40"
            >
              Unselectable
            </Color>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="icons">
        <AccordionTrigger>Icons</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <Icon
              icon={
                <IoArrowForwardCircleOutline className="h-[24px] w-[24px]" />
              }
            >
              Starting Location
            </Icon>
            <Icon icon={<BsQuestionLg className="h-[24px] w-[24px]" />}>
              Unknown
            </Icon>
            <Icon icon={<GiPayMoney className="h-[24px] w-[24px]" />}>
              Shop/Trade
            </Icon>
            <Icon icon={<IoSkullSharp className="h-[24px] w-[24px]" />}>
              Combat
            </Icon>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
