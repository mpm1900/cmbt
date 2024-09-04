import { useEncounterContext } from '@/hooks'
import { EncounterNode } from '@repo/game/types'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ChoiceButton } from './ChoiceButton'
import { EncounterLogRenderer } from './EncounterLogRenderer'

export type NodeRendererProps = {
  node: EncounterNode
}

export function NodeRenderer(props: NodeRendererProps) {
  const { node } = props
  const ctx = useEncounterContext()
  const { Component, choices, Choice = ChoiceButton } = node

  useEffect(() => {
    console.log('render node', node.id)
    if (node.render) {
      node.render(ctx)
    }
  }, [node.id])

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
      <CardContent>
        <div className="space-y-4">
          <EncounterLogRenderer />
          {node.text && <div>{node.text}</div>}
          {Component && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Component ctx={ctx} />
            </motion.div>
          )}
          {choices && (
            <div className="flex flex-col w-full">
              {choices(ctx).map((choice, index) => (
                <Choice
                  key={choice.id}
                  choice={choice}
                  index={index}
                  ctx={ctx}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
