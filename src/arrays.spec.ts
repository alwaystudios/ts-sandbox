const arr = ['this', 'is', 'a', 'test']

test('array is an object', () => {
  expect(Object.keys(arr)).toEqual(['0', '1', '2', '3'])
  expect(arr['3' as any]).toEqual('test')
  expect(arr[3]).toEqual('test')
})

test('for in', () => {
  const res: string[] = []
  for (const key in arr) {
    res.push(key)
  }
  expect(res).toEqual(['0', '1', '2', '3'])
})

test('for of', () => {
  const res: string[] = []
  for (const value of arr) {
    res.push(value)
  }
  expect(res).toEqual(['this', 'is', 'a', 'test'])
})

test('forEach', () => {
  const res: unknown[] = []
  arr.forEach((value, index) => {
    res.push({ value, index })
  })
  expect(res).toEqual([
    {
      index: 0,
      value: 'this',
    },
    {
      index: 1,
      value: 'is',
    },
    {
      index: 2,
      value: 'a',
    },
    {
      index: 3,
      value: 'test',
    },
  ])
})
