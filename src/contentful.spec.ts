import config from './contentful.secret.json'
import { createClient } from 'contentful'

const client = createClient(config)

// https://app.contentful.com/spaces/elctj32132fo/content_types/

describe('contentful', () => {
  it('gets people', async () => {
    const entries = await client.getEntries({ content_type: 'person' })
    console.log(entries.items)
  })

  it('gets blog posts', async () => {
    const entries = await client.getEntries({ content_type: 'blogPost' })
    console.log(entries.items)
  })
})
