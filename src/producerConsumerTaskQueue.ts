import { EventEmitter } from 'events'
import Queue from 'queue-fifo'

type Task<T> = () => Promise<T>

export class TaskQueuePC<T> extends EventEmitter {
  #taskQueue: Task<T>[]
  #consumerQueue: Queue<(task: Task<T>) => Task<T>>

  constructor(concurrency: number) {
    super()
    this.#taskQueue = []
    this.#consumerQueue = new Queue()

    for (let i = 0; i < concurrency; i++) {
      void this.consumer()
    }
  }

  async consumer() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const task = (await this.getNextTask()) as Task<T>
      await task()
        .then((res) => this.emit('complete', res))
        .catch((err) => this.emit('error', err))
    }
  }

  async getNextTask() {
    return new Promise((resolve) => {
      if (this.#taskQueue.length !== 0) {
        return resolve(this.#taskQueue.shift()!)
      }

      this.emit('sleep')
      this.#consumerQueue.enqueue(resolve as (task: Task<T>) => Task<T>)
    })
  }

  addTask(task: Task<T>) {
    if (this.#consumerQueue.size()) {
      const sleepingConsumer = this.#consumerQueue.dequeue()!
      sleepingConsumer(task)
      return this
    }

    this.emit('queued')
    this.#taskQueue.push(task)
    return this
  }
}
