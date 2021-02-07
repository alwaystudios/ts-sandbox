function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Date())
    }, milliseconds)
  })
}

// eslint-disable-next-line no-unused-vars
function leakingLoop(): any {
  return delay(1).then(() => {
    console.log(`Tick ${Date.now()}`)
    return leakingLoop()
  })
}

// eslint-disable-next-line no-unused-vars
function nonLeakingLoop() {
  void delay(1).then(() => {
    console.log(`Tick ${Date.now()}`)
    nonLeakingLoop()
  })
}

// eslint-disable-next-line no-unused-vars
function nonLeakingLoopWithErrors() {
  return new Promise((reject) => {
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

// eslint-disable-next-line no-unused-vars
async function nonLeakingLoopAsync() {
  while (true) {
    await delay(1)
    console.log(`Tick ${Date.now()}`)
  }
}

// eslint-disable-next-line no-unused-vars
async function leakingLoopAsync(): Promise<unknown> {
  await delay(1)
  console.log(`Tick ${Date.now()}`)
  return leakingLoopAsync()
}

for (let i = 0; i < 1e6; i++) {
  leakingLoop()
  // nonLeakingLoop()
  // nonLeakingLoopWithErrors()
  // nonLeakingLoopAsync()
  // leakingLoopAsync()
}
