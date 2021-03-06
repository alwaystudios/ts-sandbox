import EventEmitter from 'events'
import { resolve } from 'path'
import { ThreadPool } from './threadPool'

const workerFile = resolve(__dirname, 'worker.js')
const workers = new ThreadPool(workerFile, 2)

export class SubsetSumThreads extends EventEmitter {
  #sum: number
  #set: number[]

  constructor(sum: number, set: number[]) {
    super()
    this.#sum = sum
    this.#set = set
  }

  async start() {
    const worker = await workers.acquire()
    worker.postMessage({ sum: this.#sum, set: this.#set })

    const onMessage = ({ event, data }: { event: string; data: number[] }) => {
      if (event === 'end') {
        worker.removeListener('message', onMessage)
        workers.release(worker)
      }

      this.emit(event, data)
    }

    worker.on('message', onMessage)
  }
}
