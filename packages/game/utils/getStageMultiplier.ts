export function getStageMultiplier(stage: number) {
  const modifier = Math.abs(stage) / 2 + 1
  return stage >= 0 ? modifier : 1 / modifier
}
