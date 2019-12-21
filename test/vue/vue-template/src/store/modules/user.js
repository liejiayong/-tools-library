import cookie from '@/utils/cookie'
import { COOKIES_TYPE_TOKEN, COOKIES_TYPE_USERINFO, COOKIES_TYPE_HTTP_HEADER_XTOKEN } from '@/config/cookies'

const user = {
  state: {
    user: null,
    token: ''
  },
  getter: {
    getUser: state => state.user || cookie.getItem(COOKIES_TYPE_USERINFO),
    getToken: state => state.token
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.user.token = token;
      cookie.setItem(COOKIES_TYPE_TOKEN, token);
    },
    SET_HEADER_TOKEN(state, hdToken) {
      state.user.hdToken = hdToken;
      cookie.setItem(COOKIES_TYPE_HTTP_HEADER_XTOKEN, hdToken);
    },
    SET_USER_INFO(state, info = {}) {
      const info_ = JSON.stringify(Object.assign({}, state.user, info));
      state.user = info_;
      cookie.setItem(COOKIES_TYPE_USERINFO, info_);
    }
  },
  actions: {
    // 登录
    login({ commit }, loginPara) {
      console.log(loginPara)
      return new Promise((resolve, reject) => {
        commit('Login')
        // 执行完异步的ajax之后resovle(data)
        try {
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    // 退出
    logout() {
      return new Promise((resolve, reject) => {
        try {
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}

export default user
