export function ifArray<T = unknown>(value: boolean, arr: T[]): T[] {
  if (value) return arr
  return []
}
