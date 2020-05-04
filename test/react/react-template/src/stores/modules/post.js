import { observable, action, runInAction } from 'mobx'
import { apiGetPosts } from '@/api/index'

class PostStore {
  @observable list = []

  @action
  getPost = async () => {
    try {
      const data = await apiGetPosts()
      console.log('mobx get post', data)
      runInAction(() => {
        this.list = data
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default PostStore
