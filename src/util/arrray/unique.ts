export const uniqueBy = <T, U>(arr: T[], mapper: (item: T) => U): T[] => {
  const map = new Map<U, T>()

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const key = mapper(item)

    if (!map.has(key)) {
      map.set(key, item)
    }
  }

  return Array.from(map.values())
}

export const unique = <T extends string | number>(arr: T[]): T[] => {
  return [...new Set(arr)]
}
