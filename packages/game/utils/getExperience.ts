export function getExperience(level: number) {
  return Math.pow(level, 3)
}

export function getExperienceToNextLevel(currentLevel: number) {
  const totalXpToCurrentLevel = getExperience(currentLevel)
  const totalXpToNextLevel = getExperience(currentLevel + 1)
  return totalXpToNextLevel - totalXpToCurrentLevel
}

export function getLevel(experience: number) {
  return Math.pow(experience, 1 / 3)
}

export function getExperienceResult(
  level: number,
  unitXp: number,
  xp: number
): { level: number; xp: number } {
  const total = unitXp + xp
  const totalXp = getExperience(level) + total
  const newLevel = getLevel(totalXp)
  const flooredLevel = Math.floor(newLevel)
  const leftOverXp = totalXp - getExperience(flooredLevel)

  return {
    level: flooredLevel,
    xp: leftOverXp,
  }
}
