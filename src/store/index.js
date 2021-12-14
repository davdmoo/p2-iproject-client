import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
let baseURL = 'http://localhost:3000'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    SET_LOGIN: function (state, payload = false) {
      state.isLoggedIn = payload
    }
  },
  actions: {
    login: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseURL}/login`,
          method: 'post',
          data: payload
        })
          .then(resp => {
            localStorage.setItem('access_token', resp.data.access_token)
            context.commit('SET_LOGIN', true)
            Swal.fire({
              icon: 'success',
              title: 'Hello!',
              text: 'Welcome back!'
            })
            resolve()
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: "It's us, not you..",
              text: `A little reminder though - ${err.response.data.message}`
            })
            reject()
          })
      })
    },
    register: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseURL}/register`,
          method: 'post',
          data: payload
        })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Hello!',
              text: 'Welcome to the club!'
            })
            resolve()
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: "It's us, not you..",
              text: `${err.response.data.message} though, just saying`
            })
            reject()
          })
      })
    }
  },
  modules: {
  }
})