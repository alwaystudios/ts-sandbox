const pluck = <T, K extends keyof T>(data: T[], key: K): T[K][] => {
  return data.map((d) => d[key])
}

test('pluck', () => {
  const data = [...Array(3)].map((_, index) => ({
    id: index,
    title: `item: ${index}`,
    start: new Date(),
  }))

  const titles: string[] = pluck(data, 'title')
  const dates: Date[] = pluck(data, 'start')
  const ids: number[] = pluck(data, 'id')

  expect(titles).toEqual(['item: 0', 'item: 1', 'item: 2'])
  expect(ids).toEqual(expect.any(Array))
  expect(dates).toEqual(expect.any(Array))
})
