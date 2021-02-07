import pMap from 'p-map'

type Data = {
  site: string
  timestamp: number
}

const fn = async (site: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ site, timestamp: Date.now() })
    }, 1005)
  })
}

const sites = ['google.com', 'bbc.co.uk', 'github.com']

const mapper = async (name: string) => {
  const result = await fn(name)
  return result
}

describe('p map', () => {
  it('maps with concurrency 1', async () => {
    const [res1, res2, res3] = (await pMap(sites, mapper, { concurrency: 1 })) as Data[]

    expect(Math.abs(res1.timestamp - res2.timestamp)).toBeGreaterThanOrEqual(1000)
    expect(Math.abs(res2.timestamp - res3.timestamp)).toBeGreaterThanOrEqual(1000)
  })

  it('maps with concurrency 3', async () => {
    const [res1, res2, res3] = (await pMap(sites, mapper, { concurrency: 3 })) as Data[]

    expect(Math.abs(res1.timestamp - res2.timestamp)).toBeLessThanOrEqual(5)
    expect(Math.abs(res2.timestamp - res3.timestamp)).toBeLessThanOrEqual(5)
    expect(Math.abs(res1.timestamp - res3.timestamp)).toBeLessThanOrEqual(5)
  })
})
