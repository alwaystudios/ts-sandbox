import { createServer } from 'http'
import { cpus } from 'os'
import cluster from 'cluster'

if (cluster.isMaster) {
  const availableCpus = cpus()
  console.log(`Clustering to ${availableCpus.length} processes`)
  availableCpus.forEach(() => cluster.fork())
} else {
  const { pid } = process
  const server = createServer((_, res) => {
    console.log(`Handling request from ${pid}`)
    res.end(`Hello from ${pid}\n`)
  })

  server.listen(8000, () => console.log(`Started process ${pid} at ${8000}`))
}

// kill a process
// ps aux | grep httpCluster
// kill -9 3827
