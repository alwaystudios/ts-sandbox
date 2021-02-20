import { createServer, IncomingMessage, ServerResponse } from 'http'
import { getPortPromise } from 'portfinder'
import { SubsetSumThreads } from './subsetSumThreads'

getPortPromise().then((port) => {
  createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url!, 'http://localhost')

    if (url.pathname !== '/subsetsum') {
      res.writeHead(200)
      return res.end('healthy')
    }

    const data = url.searchParams.get('data')
    const sum = url.searchParams.get('sum')

    if (!data || !sum) {
      res.writeHead(404)
      return res.end('must provide data and sum as query string params')
    }

    res.writeHead(200)
    const subsetSumThreads = new SubsetSumThreads(Number.parseInt(sum), JSON.parse(data))
    subsetSumThreads.on('match', (match: any) => res.write(`match: ${JSON.stringify(match)}\n`))
    subsetSumThreads.on('end', () => res.end())
    subsetSumThreads.start()
  }).listen(port, () => console.log(`server started on port: ${port}`))
})
