import pLimit, { Limit } from 'p-limit'

const fn = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Date.now())
    }, 1000)
  })
}

const createLimit = (concurrency: number) => pLimit(concurrency)
const createTasks = (count: number, limiter: Limit) =>
  [...Array(count)].map(() => limiter(() => fn()))

describe('p limit', () => {
  it('limits concurrency to 1', async () => {
    const tasks = createTasks(3, createLimit(1))
    const [res1, res2, res3] = (await Promise.all(tasks)) as number[]

    expect(Math.abs(res1 - res2)).toBeGreaterThanOrEqual(1000)
    expect(Math.abs(res2 - res3)).toBeGreaterThanOrEqual(1000)
  })

  it('runs tasks in parallel', async () => {
    const tasks = createTasks(3, createLimit(3))
    const [res1, res2, res3] = (await Promise.all(tasks)) as number[]

    expect(Math.abs(res1 - res2)).toBeLessThanOrEqual(5)
    expect(Math.abs(res2 - res3)).toBeLessThanOrEqual(5)
    expect(Math.abs(res1 - res3)).toBeLessThanOrEqual(5)
  })
})
