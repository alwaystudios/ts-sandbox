const calculate = (arr: number[]) =>
  arr.reduce(
    (acc: number, curr: number) => (arr.filter((x) => curr === x).length > 1 ? acc + curr : acc),
    0,
  )

test('sums all numbers in an array that appear more than once', () => {
  expect(calculate([7, 2, 7, 7, 9, 5, 2])).toEqual(25)
})
