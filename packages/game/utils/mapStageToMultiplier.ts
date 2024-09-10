export function mapStageToMultiplier(stage: number) {
  const modifier = Math.min(Math.abs(stage) / 2 + 1, 4)
  return stage >= 0 ? modifier : 1 / modifier
}
