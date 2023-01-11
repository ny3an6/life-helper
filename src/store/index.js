import { createStore } from 'vuex'
import axios from 'axios'

// TODO: Сделать обработку рефреш токена
// eslint-disable-next-line no-unused-vars
const token = localStorage.getItem('token')
// if (token) {
//   axios.defaults.headers.common.Authorization = token
// }
const urlLogin = 'http://localhost:8888/authentication-service/api/auth/login'
export default createStore({
  state: {
    status: '',
    errorMessage: '',
    token: localStorage.getItem('token') || '',
    user: {},
    userInfo: {}
  },
  getters: {
    authStatus: state => state.status,
    infoToken: state => state.token,
    infoUser: state => state.userInfo,
    infoErrorMsg: state => state.errorMessage
  },
  mutations: {
    auth_success (state, token, user) {
      state.status = 'success'
      state.user = user
      state.token = token
      console.log('accessToken:', state.token)
    },
    auth_user_info (state, userInfo) {
      state.status = 'success'
      state.userInfo = userInfo
    },
    auth_error (state, err) {
      state.status = 'error'
      state.errorMessage = err.response.data.error
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    register ({ commit }, user) {
      console.log(user)
      return new Promise((resolve) => {
        axios({ url: 'http://localhost:8888/authentication-service/api/registration/user/create', data: user, method: 'POST' })
          .then(resp => {
            const user = resp.data.user
            commit('auth_success', user)
            resolve(resp)
          })
      })
    },
    auth ({ commit }, user) {
      return new Promise((resolve) => {
        axios({
          url: urlLogin,
          data: user,
          method: 'POST'
        })
          .then(resp => {
            const token = resp.data.accessToken
            const refreshToken = resp.data.refreshToken
            localStorage.setItem('token', token)
            // axios.defaults.headers.common.Authorization = token
            commit('auth_success', token, user)
            resolve(resp)
            console.log(token, refreshToken)
          })
          .catch(err => {
            commit('auth_error', err)
            console.log(err.response.data.error)
            localStorage.removeItem('token')
            // delete axios.defaults.headers.common.Authorization
            console.log(this.state.errorMessage)
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
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('token')
        commit('logout')
        // delete axios.defaults.headers.common.Authorization
        resolve()
      })
    }
  },
  modules: {
  }
})
