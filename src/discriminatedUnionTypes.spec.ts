type Boss = {
  president?: Official
  king?: Monarch
}

type Official = {
  name: string
  age: number
}

type Monarch = {
  name: string
  title: string
}

const bossName = ({ president, king }: Boss): string => {
  if (president) {
    return president.name
  } else if (king) {
    return king.name
  }
  // Still the type definitions allows a case where both properties might
  // be null so we must plan for this
  else {
    return 'Apparently total anarchy'
  }
}

test('bossName', () => {
  expect(bossName({ king: { name: 'Gary', title: 'Royal Highness' } })).toEqual('Gary')
  expect(bossName({ president: { name: 'Gary', age: 44 } })).toEqual('Gary')
})

type BossUnion = Official | Monarch

const bossName2 = (boss: BossUnion): string => {
  return boss.name
}

test('bossName2', () => {
  expect(bossName2({ name: 'Gary', title: 'Royal Highness' })).toEqual('Gary')
  expect(bossName2({ name: 'Gary', age: 44 })).toEqual('Gary')
})

// using the as operator
const bossName3 = (boss: BossUnion): string => {
  if ((boss as Official).age) {
    const official = boss as Official
    return `${official.name}, ${official.age} years old`
  } else if ((boss as Monarch).title) {
    const monarch = boss as Monarch
    return `${monarch.title}, ${monarch.name}`
  } else {
    return 'The anarchy continues'
  }
}

test('bossName3', () => {
  expect(bossName3({ name: 'Gary', title: 'Royal Highness' })).toEqual('Royal Highness, Gary')
  expect(bossName3({ name: 'Gary', age: 44 })).toEqual('Gary, 44 years old')
})

// type predicate guards using the is operator
const isMonarch = (boss: BossUnion): boss is Monarch => {
  return (boss as Monarch).title !== undefined
}

test('isMonarch', () => {
  expect(isMonarch({ name: 'Gary', title: 'Royal Highness' })).toEqual(true)
  expect(isMonarch({ name: 'Gary', age: 44 })).toEqual(false)
})

// using the in operator
const bossName4 = (boss: BossUnion): string => {
  if ('age' in boss) {
    return `${boss.name}, ${boss.age} years old`
  }
  return `${boss.title}, ${boss.name}`
}

test('bossName4', () => {
  expect(bossName4({ name: 'Gary', title: 'Royal Highness' })).toEqual('Royal Highness, Gary')
  expect(bossName4({ name: 'Gary', age: 44 })).toEqual('Gary, 44 years old')
})

// discriminated unions
type Official_v2 = {
  __typename: 'Official'
  name: string
  age: number
}

type Monarch_v2 = {
  __typename: 'Monarch'
  name: string
  title: string
}

type Boss_v2 = Official_v2 | Monarch_v2

const bossName5 = (boss: Boss_v2): string => {
  if (boss.__typename === 'Official') {
    return `${boss.name}, ${boss.age} years old`
  }
  return `${boss.title}, ${boss.name}`
}

test('bossName5', () => {
  expect(bossName5({ __typename: 'Monarch', name: 'Gary', title: 'Royal Highness' })).toEqual(
    'Royal Highness, Gary',
  )
  expect(bossName5({ __typename: 'Official', name: 'Gary', age: 44 })).toEqual('Gary, 44 years old')
})
