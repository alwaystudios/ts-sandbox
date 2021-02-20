import { Worker } from 'worker_threads'

type Resolve = (worker: Worker) => void
type Reject = (reason?: string) => void

type WaitingWorker = {
  resolve: Resolve
  reject: Reject
}

export class ThreadPool {
  #file: string
  #poolMax: number
  #pool: Worker[]
  #active: Worker[]
  #waiting: WaitingWorker[]

  constructor(file: string, poolMax: number) {
    this.#file = file
    this.#poolMax = poolMax
    this.#pool = []
    this.#active = []
    this.#waiting = []
  }

  acquire() {
    return new Promise((resolve: Resolve, reject: Reject) => {
      let worker: Worker | undefined
      if (this.#pool.length) {
        worker = this.#pool.pop()
        if (!worker) {
          throw new Error('unexpected null pool worker')
        }
        this.#active.push(worker)
        return resolve(worker)
      }

      if (this.#active.length >= this.#poolMax) {
        return this.#waiting.push({ resolve, reject })
      }

      worker = new Worker(this.#file)
      worker.once('online', () => {
        if (!worker) {
          throw new Error('unexpected null new worker thread')
        }
        this.#active.push(worker)
        resolve(worker)
      })
      worker.once('exit', (code) => {
        console.log(`worker exited with code: ${code}`)
        this.#active = this.#active.filter((w) => worker !== w)
        this.#pool = this.#pool.filter((w) => worker !== w)
      })
    })
  }

  release(worker: Worker) {
    if (this.#waiting.length) {
      const waitingPromise = this.#waiting.shift()
      if (!waitingPromise) {
        throw new Error('unexpected null waiting worker promise')
      }
      return waitingPromise.resolve(worker)
    }

    this.#active = this.#active.filter((w) => worker !== w)
    this.#pool.push(worker)
  }
}
