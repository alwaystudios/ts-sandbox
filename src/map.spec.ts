describe('new Map()', () => {
  it('set, has, get', () => {
    const cache = new Map()

    cache.set('test', false)

    expect(cache.has('test')).toBe(true)
    expect(cache.get('test')).toBe(false)
  })
})
