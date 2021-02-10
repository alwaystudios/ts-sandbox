function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Date())
    }, milliseconds)
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function leakingLoop(): any {
  return delay(1).then(() => {
    console.log(`Tick ${Date.now()}`)
    return leakingLoop()
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function nonLeakingLoop() {
  void delay(1).then(() => {
    console.log(`Tick ${Date.now()}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nonLeakingLoop()
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function nonLeakingLoopWithErrors() {
  return new Promise((reject) => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(function internalLoop() {
      delay(1)
        .then(() => {
          console.log(`Tick ${Date.now()}`)
          internalLoop()
        })
        .catch((err) => {
          reject(err)
        })
    })()
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function nonLeakingLoopAsync() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await delay(1)
    console.log(`Tick ${Date.now()}`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function leakingLoopAsync(): Promise<unknown> {
  await delay(1)
  console.log(`Tick ${Date.now()}`)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return leakingLoopAsync()
}

for (let i = 0; i < 1e6; i++) {
  leakingLoop()
  // nonLeakingLoop()
  // nonLeakingLoopWithErrors()
  // nonLeakingLoopAsync()
  // leakingLoopAsync()
}
