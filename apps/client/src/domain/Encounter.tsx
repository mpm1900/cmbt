import { ChoiceButton } from '@/components/encounter/ChoiceButton'
import { Sidebar } from '@/components/encounter/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEncounterContext } from '@/hooks'
import { EncounterChoice } from '@repo/game/types'
import { Navbar } from '@shared/Navbar'
import { useState } from 'react'

export function Encounter() {
  const ctx = useEncounterContext()

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900 overflow-auto">
      <div className="flex flex-1 flex-row">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Card className="max-w-[640px]">
            <CardHeader>
              <CardTitle>{ctx.activeNode.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>{ctx.activeNode.description}</div>
              {ctx.activeNode.renderChoices ? (
                ctx.activeNode.renderChoices(ctx)
              ) : (
                <div className="space-x-2">
                  {ctx.activeNode
                    .choices(ctx)
                    .map((choice, index) =>
                      ctx.activeNode.renderChoice ? (
                        ctx.activeNode.renderChoice(choice, index, ctx)
                      ) : (
                        <ChoiceButton key={choice.id} choice={choice} />
                      )
                    )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Sidebar />
      </div>
    </div>
  )
}
