import { TaskQueuePC } from './producerConsumerTaskQueue'
import waitForExpect from 'wait-for-expect'

const onError = jest.fn()
const onComplete = jest.fn()
const onQueue = jest.fn()
const onSleep = jest.fn()

const createQueue = (concurrency = 0) => {
  return new TaskQueuePC(concurrency)
    .on('error', onError)
    .on('complete', onComplete)
    .on('queued', onQueue)
    .on('sleep', onSleep)
}

const createTask = (timeout = 0) => () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Date.now())
    }, timeout)
  })
}

describe('task queue', () => {
  beforeEach(jest.resetAllMocks)

  it('processes tasks sequentially added to the queue', async () => {
    const queue = createQueue(1)

    queue.addTask(createTask())
    await waitForExpect(() => {
      expect(onComplete).toHaveBeenCalledTimes(1)
    })

    expect(onError).not.toHaveBeenCalled()

    queue.addTask(createTask())
    await waitForExpect(() => {
      expect(onComplete).toHaveBeenCalledTimes(2)
    })

    expect(onError).not.toHaveBeenCalled()
    expect(onQueue).not.toHaveBeenCalled()
    expect(onSleep).toHaveBeenCalledTimes(2)
  })

  it('runs within a concurrency limit', async () => {
    const tasks = [...Array(4)].map(() => createTask(1000))
    const queue = createQueue(2)
    tasks.forEach((task) => queue.addTask(task))

    await waitForExpect(() => {
      expect(onComplete).toHaveBeenCalledTimes(tasks.length)
    })

    const task1Time = onComplete.mock.calls[0][0]
    const task2Time = onComplete.mock.calls[1][0]
    const task3Time = onComplete.mock.calls[2][0]
    const task4Time = onComplete.mock.calls[3][0]

    expect(onQueue).toHaveBeenCalledTimes(2)
    expect(Math.abs(task1Time - task2Time)).toBeLessThan(10)
    expect(Math.abs(task3Time - task4Time)).toBeLessThan(10)
    expect(Math.abs(task1Time - task4Time)).toBeGreaterThanOrEqual(1000)
    expect(Math.abs(task2Time - task3Time)).toBeGreaterThanOrEqual(1000)
    expect(onError).not.toHaveBeenCalled()
  })

  it('handles task errors', async () => {
    const errorTask = async () => {
      return Promise.reject()
    }

    createQueue(1).addTask(errorTask).addTask(createTask())

    await waitForExpect(() => {
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onComplete).toHaveBeenCalledTimes(1)
    })
  })
})
