import { useEncounterContext } from '@/hooks'
import { EncounterNode } from '@repo/game/types'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { ChoiceButton } from './ChoiceButton'

export type NodeRendererProps = {
  node: EncounterNode
}

export function NodeRenderer(props: NodeRendererProps) {
  const { node } = props
  const ctx = useEncounterContext()
  const { Component, choices, Choice = ChoiceButton } = node

  return (
    <Card className="w-[640px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex space-x-2">
            <div>{node.icon}</div>
            <div>{node.title}</div>
          </CardTitle>
          {node.tabs && (
            <div className="flex">
              {node.tabs(ctx).map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => tab.resolve(ctx)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>{node.text}</div>
        <Separator />
        {Component && <Component ctx={ctx} />}
        {choices && (
          <div className="flex flex-col">
            {choices(ctx).map((choice, index) => (
              <Choice key={choice.id} choice={choice} index={index} ctx={ctx} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
