test('symbol', () => {
  const obj = Object.create(null)
  const sym1 = Symbol('my new symbol')
  const sym2 = Symbol()
  obj[sym1] = 'foo'
  obj[sym2] = 'oof'
  obj.bar = 'bar'

  expect(obj[Symbol()]).toBeUndefined()
  expect(obj).toMatchObject({ bar: 'bar', [Symbol()]: 'foo', [Symbol()]: 'oof' })
  expect(JSON.stringify(obj)).toEqual('{"bar":"bar"}')
  expect(sym1 in obj).toBe(true)
  expect(sym2 in obj).toBe(true)
  expect(obj[sym1]).toBe('foo')
  expect(obj[sym2]).toBe('oof')
  expect(Object.keys(obj)).toEqual(['bar'])
  expect(Object.entries(obj)).toEqual([['bar', 'bar']])
  expect(typeof sym1).toBe('symbol')
})
