import { parentPort } from 'worker_threads'
import { SubsetSum } from './SubsetSum'

if (!parentPort) {
  throw new Error('unexpected null parent port')
}

parentPort.on('message', ({ sum, set }: { sum: number; set: number[] }) => {
  const subsetSum = new SubsetSum(sum, set)

  subsetSum.on('match', (data: number[]) => {
    parentPort!.postMessage({ event: 'match', data })
  })

  subsetSum.on('end', () => {
    parentPort!.postMessage({ event: 'end' })
  })

  subsetSum.process()
})
