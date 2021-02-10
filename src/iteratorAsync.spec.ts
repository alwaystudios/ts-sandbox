import superagent from 'superagent'

export class CheckUrls {
  #urls: string[]

  constructor(urls: string[]) {
    this.#urls = urls
  }

  async *[Symbol.asyncIterator]() {
    for (const url of this.#urls) {
      try {
        await superagent.head(url).redirects(2)
        yield true
      } catch (err) {
        yield false
      }
    }
  }
}

describe('async iterators', () => {
  it('check urls', async () => {
    const urls = new CheckUrls(['www.google.com', 'www.github.com', 'www.thiswontwork.org'])
    const result: boolean[] = []

    for await (const status of urls) {
      result.push(status)
    }

    expect(result).toEqual([true, true, false])
  })
})
