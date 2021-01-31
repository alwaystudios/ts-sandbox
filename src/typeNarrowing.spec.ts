interface UploadEvent {
  type: 'upload'
  destination: string
  content: unknown
}
interface DownloadEvent {
  type: 'download'
  data: unknown
}
type ApplicationEvent = UploadEvent | DownloadEvent

const handleEvent = (event: ApplicationEvent): unknown => {
  switch (event.type) {
    case 'download':
      return event.data
    case 'upload':
      return event.destination
  }
}

test('type narrowing', () => {
  expect(handleEvent({ type: 'upload', destination: 'S3', content: '123' })).toEqual('S3')
  expect(handleEvent({ type: 'download', data: '456' })).toEqual('456')
})
