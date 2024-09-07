import { useCy } from '@/hooks/state'
import { Button } from '../ui/button'

export function WorldActions() {
  const { cy, centerActive, fitAll, fitActive } = useCy()

  return (
    <>
      {cy && (
        <div>
          <Button variant="ghost" onClick={() => fitAll(cy)}>
            Zoom Out
          </Button>
          <Button variant="ghost" onClick={() => centerActive(cy)}>
            Center
          </Button>
          <Button variant="ghost" onClick={() => fitActive(cy)}>
            Reset
          </Button>
        </div>
      )}
    </>
  )
}
