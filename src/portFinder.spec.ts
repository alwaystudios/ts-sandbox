import portfinder from 'portfinder'

test('port finder', async () => {
  const port = await portfinder.getPortPromise()
  console.log(port)
})
