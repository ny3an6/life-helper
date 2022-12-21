import { createStore } from 'vuex'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'

// eslint-disable-next-line no-unused-vars
const token = localStorage.getItem('token')
export default createStore({
  state: {
    status: true,
    token: localStorage.getItem('token') || '',
    user: {},
    userInfo: {}
  },
  getters: {
    isLoggedIn: state => state.status,
    infoToken: state => state.token,
    infoUser: state => state.userInfo
  },
  mutations: {
    auth_success (state, token, user) {
      state.status = true
      state.token = token
      state.user = user
      console.log('accessToken:', state.token)
    },
    auth_user_info (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    register ({ commit }, user) {
      console.log(user)
      // return new Promise((resolve) => {
      //   axios({ url: 'http://localhost:8888/authentication-service/api/registration/user/create', data: user, method: 'POST' })
      //     .then(resp => {
      //       const token = resp.data.token
      //       const user = resp.data.user
      //       localStorage.setItem('token', token)
      //       commit('auth_success', token, user)
      //       resolve(resp)
      //       console.log(token)
      //     })
      // })
    },
    auth ({ commit }, user) {
      return new Promise((resolve) => {
        axios({
          url: 'http://localhost:8888/authentication-service/api/auth/login',
          data: user,
          method: 'POST'
        })
          .then(resp => {
            const token = resp.data.accessToken
            const refreshToken = resp.data.refreshToken
            localStorage.setItem('token', token)
            commit('auth_success', token, user)
            resolve(resp)
            console.log(token, refreshToken)
          })
      })
    },
    info ({ commit }, token) {
      axios({
        url: 'http://localhost:8888/authentication-service/api/user/info',
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token, Accept: '*/*' }
      })
        .then(resp => {
          const userInfo = resp.data
          console.log(userInfo)
          commit('auth_user_info', userInfo)
        })
    }
  },
  modules: {
  }
})
