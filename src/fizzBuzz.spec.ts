const fizzBuzz = (arr: number[]): string => {
  const result = arr.map((n) =>
    n.toString().includes('3')
      ? 'lucky'
      : n % 15 === 0
      ? 'fizzbuzz'
      : n % 5 === 0
      ? 'buzz'
      : n % 3 === 0
      ? 'fizz'
      : n,
  )

  const fizzCount = result.filter((v) => v === 'fizz').length
  const buzzCount = result.filter((v) => v === 'buzz').length
  const fizzBuzzCount = result.filter((v) => v === 'fizzbuzz').length
  const luckyCount = result.filter((v) => v === 'lucky').length
  const intCount = result.filter((v) => typeof v === 'number').length

  const stats = `fizz: ${fizzCount} buzz: ${buzzCount} fizzbuzz: ${fizzBuzzCount} lucky: ${luckyCount} integer: ${intCount}`
  return `${result.join(' ')} ${stats}`
}

test('fizzBuzz', () => {
  const arr = [...Array(20)].map((_, i) => i + 1)
  const expected =
    '1 2 lucky 4 buzz fizz 7 8 fizz buzz 11 fizz lucky 14 fizzbuzz 16 17 fizz 19 buzz fizz: 4 buzz: 3 fizzbuzz: 1 lucky: 2 integer: 10'

  expect(fizzBuzz(arr)).toEqual(expected)
})
