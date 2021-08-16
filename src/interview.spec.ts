const calculate = (arr: number[]) => {
  const numbersWithDuplicates = Array.from(new Set(arr)).reduce(
    (acc: number[], curr: number) =>
      arr.filter((x) => curr === x).length > 1 ? [...acc, curr] : acc,
    [],
  )

  return arr.filter((n) => numbersWithDuplicates.includes(n)).reduce((acc, curr) => acc + curr, 0)
}

test('sums all numbers in an array that appear more than once', () => {
  expect(calculate([7, 2, 7, 7, 9, 5, 2])).toEqual(25)
})
