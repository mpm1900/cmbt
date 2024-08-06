import { Button } from '@/components/ui/button'
import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { useInitializeCombat } from '@/hooks/useInitializeCombat'

export function Builder() {
  const init = useInitializeCombat()
  const store = useUnitBuilders()

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-auto">
      <div className="p-4">
        <Button onClick={() => init()}>Initialize Combat</Button>
      </div>
      <div className="flex flex-1 ">
        <div></div>
      </div>
    </div>
  )
}
