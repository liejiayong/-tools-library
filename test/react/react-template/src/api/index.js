import { get } from '@/utils/axios'

export async function apiGetPosts(args = {}) {
  const url = 'https://cnodejs.org/api/v1/topics'
  const params = { page: 1, pageSize: 10, ...args }
  const res = await get(url, params)
  if (res.success) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject()
  }
}
