import Store from '@/utils/store-mobx'
import counter from './modules/counter'
import post from './modules/post'
import input from './modules/input'

export default new Store({ counter, post, input })
