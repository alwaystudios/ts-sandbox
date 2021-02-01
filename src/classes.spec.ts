import shortid from 'shortid'

const fetchUser = jest.fn().mockResolvedValue({ userId: '123', username: 'test 1' })
const fetchUserPosts = jest
  .fn()
  .mockResolvedValue([
    { title: 'my first post', content: 'this is my first post', timestamp: Date.now() },
  ])

interface IUserPost {
  getUsername: () => string
}

type UserInfo = {
  userId: string
  username: string
}

type Post = {
  title: string
  content: string
  timestamp: number
}

class UserPost implements IUserPost {
  user: UserInfo
  posts: Post[]
  #somePrivateInfo: string // private field

  constructor(user: UserInfo, posts: Post[], secret: string) {
    this.user = user
    this.posts = posts
    this.#somePrivateInfo = secret
  }

  static async init(userId: string): Promise<UserPost> {
    const [user, posts] = await Promise.all([fetchUser(userId), fetchUserPosts(userId)])

    return new UserPost(user, posts, shortid())
  }

  getUsername() {
    return this.user.username
  }

  getSecret() {
    return this.#somePrivateInfo
  }
}

test('get username', async () => {
  const user1 = await UserPost.init('123')

  expect(user1.getUsername()).toEqual('test 1')

  // console.log(user1.#somePrivateInfo)
  // Property '#somePrivateInfo' is not accessible outside class 'UserPost' because it has a private identifier.
})
