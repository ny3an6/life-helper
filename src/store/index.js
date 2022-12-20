import { createStore } from 'vuex'
import axios from 'axios'

// eslint-disable-next-line no-unused-vars
const token = localStorage.getItem('token')
export default createStore({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  getters: {
  },
  mutations: {
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    }
  },
  actions: {
    register ({ commit }, user) {
      return new Promise((resolve) => {
        axios({ url: 'http://localhost:8888/authentication-service/api/registration/user/create', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common.Authorization = token
            commit('auth_success', token, user)
            resolve(resp)
            console.log(token)
          })
      })
    }
  },
  modules: {
  }
})
