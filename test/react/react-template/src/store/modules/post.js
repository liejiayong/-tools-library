import { observable, action, runInAction } from 'mobx'
import { apiGetPosts } from '@/api/post'

class PostStore {
  @observable
  list = []

  @action
  getPosts = async () => {
    try {
      const data = await apiGetPosts()
      console.log('get posts', data)
      runInAction(() => {
        this.list = data
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export default PostStore
