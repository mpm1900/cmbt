export function getRandom<T>(array: T[]): T {
  return array[Math.round(Math.random() * array.length)]
}
