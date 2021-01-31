type Data = {
  id: number
  name: string
}

type Data2 = Omit<Data, 'id'>

test('omit id from data type', () => {
  const data2: Data2 = {
    name: 'test 1',
  }

  expect(Object.keys(data2)).toEqual(['name'])
})
