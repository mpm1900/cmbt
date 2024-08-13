import { useCamera } from '@react-sigma/core'
import { Button } from '../ui/button'

export function GraphResetButton() {
  const { reset } = useCamera({ duration: 200, factor: 1.5 })
  return <Button onClick={() => reset()}>Reset Map</Button>
}
