export function getPermutations<T = unknown>(
  a: T[],
  n: number,
  s: T[][] = [],
  t: T[] = []
) {
  return a.reduce((p, c, i, a) => {
    n > 1
      ? getPermutations(
          a.slice(0, i).concat(a.slice(i + 1)),
          n - 1,
          p,
          (t.push(c), t)
        )
      : p.push((t.push(c), t).slice(0))
    t.pop()
    return p
  }, s)
}
