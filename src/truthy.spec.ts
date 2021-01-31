type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T

const truthy = <T>(value: T): value is Truthy<T> => Boolean(value)

describe('truthy', () => {
  it('filter an array', () => {
    expect(
      ['test', 1, -1, 0, null, undefined, 'true', 'false', false, true].filter(truthy),
    ).toEqual(['test', 1, -1, 'true', 'false', true])
  })

  test.each<
    [
      {
        test: string
      } | null,
      string | null,
    ]
  >([
    [{ test: 'test 1' }, 'test 1'],
    [null, null],
  ])('single value %s', (value, expected) => {
    const result = truthy(value) ? value.test : null // "value.test" only works here because of the user defined type guard on line 3
    expect(result).toEqual(expected)
  })
})
