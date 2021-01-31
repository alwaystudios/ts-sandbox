const FIBONACCI = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

const fibonacci = (val: number): number => (val < 2 ? val : fibonacci(val - 1) + fibonacci(val - 2))

const memoizer = (memo: number[], formula: Function, onMemo?: Function) => {
  const recur = (val: number) => {
    let result = memo[val]
    if (typeof (result as any) !== 'number') {
      onMemo && onMemo(val)
      result = formula(recur, val)
      memo[val] = result
    }
    return result
  }
  return recur
}

const onMemo = jest.fn()
const fibonacciV2 = memoizer(
  [0, 1, 1, 2, 3],
  (formula: Function, val: number) => formula(val - 1) + formula(val - 2),
  onMemo,
)

test('memoizer', () => {
  const fibs = [...Array(10)].map((_, index) => fibonacci(index))
  expect(fibs).toEqual(FIBONACCI)

  const memoFibs = [...Array(10)].map((_, index) => fibonacciV2(index))
  expect(memoFibs).toEqual(FIBONACCI)
  expect(onMemo).toHaveBeenCalledTimes(5)

  expect(memoFibs).toEqual(FIBONACCI)
  expect(onMemo).toHaveBeenCalledTimes(5)

  expect(fibonacciV2(11)).toEqual(89)
  expect(onMemo).toHaveBeenCalledTimes(7)

  expect(fibonacciV2(10)).toEqual(55)
  expect(onMemo).toHaveBeenCalledTimes(7)
})
