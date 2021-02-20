import { parentPort } from 'worker_threads'
import { SubsetSum } from './subsetSum'

if (!parentPort) {
  throw new Error('unexpected null parent port')
}

parentPort.on('message', (msg: any) => {
  console.log(`message: ${msg}`)
  const subsetSum = new SubsetSum(msg.sum, msg.set)

  subsetSum.on('match', (data: any) => {
    parentPort!.postMessage({ event: 'match', data })
  })

  subsetSum.on('end', (data: any) => {
    parentPort!.postMessage({ event: 'end', data })
  })

  subsetSum.process()
})
