import { AccordionContent } from '@radix-ui/react-accordion'
import { Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion'

export function WorldLegend() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="colors">
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent>one two three</AccordionContent>
      </AccordionItem>
      <AccordionItem value="icons">
        <AccordionTrigger>Icons</AccordionTrigger>
        <AccordionContent>one two three</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
