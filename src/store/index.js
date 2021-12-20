import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
let baseURL = 'https://halita-kanban.herokuapp.com'
// let baseURL = 'http://localhost:8000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    inProgress: [],
    done: [],
    fresh: []
  },
  mutations: {
    SET_LOGIN: function (state, payload = false) {
      state.isLoggedIn = payload
    },
    SET_NOTES: function (state, payload) {
      state.notes = payload
    },
    SET_FRESH: function (state, payload) {
      state.fresh = payload
    },
    SET_IN_PROGRESS: function (state, payload) {
      state.inProgress = payload
    },
    SET_DONE: function (state, payload) {
      state.done = payload
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
              text: `Welcome back ${resp.data.payload.email}!`
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
              title: 'Welcome to the club!',
              text: 'We have emailed you a warm welcome. Go check it out!'
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
    },
    getNotes: function (context) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseURL}/notes`,
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(resp => {
            let fresh = []
            let inProgress = []
            let done = []
            resp.data.forEach(note => {
              if (note.status === 'Fresh') {
                fresh.push(note)
              } else if (note.status === 'inProgress') {
                inProgress.push(note)
              } else if (note.status === 'Done') {
                done.push(note)
              }
            })
            context.commit('SET_FRESH', fresh)
            context.commit('SET_IN_PROGRESS', inProgress)
            context.commit('SET_DONE', done)

            resolve()
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: "Sorry..",
              text: err.response.data.message
            })
            reject(err)
          })
      })
    },
    addNote: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseURL}/notes`,
          method: 'post',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            title: payload.title,
            content: 'Add some content'
          }
        })
          .then((resp) => {
            context.commit('SET_FRESH', resp.data)
            resolve()
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: "Sorry..",
              text: err.response.data.message
            })
            reject(err)
          })
      })
    },
    deleteNote: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseURL}/notes/${payload}`,
          method: 'delete',
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(() => {
          resolve()
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: "Sorry..",
            text: err.response.data.message
          })
          reject(err)
        })
      })
    },
    patchNote: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseURL}/notes/${payload.id}`,
          method: 'patch',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            status: payload.status
          }
        })
          .then((resp) => {
            if (payload.status === 'Fresh') {
              context.commit('SET_FRESH', resp.data)
            } else if (payload.status === 'inProgress') {
              context.commit('SET_IN_PROGRESS', resp.data)
            } else {
              context.commit('SET_DONE', resp.data)
            }
            resolve()
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: "We get that you're busy, but..",
              text: err.response.data.message
            })
            reject(err)
          })
      })
    },
    googleLogin: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseURL}/authGoogle`,
          method: 'post',
          data: payload
        })
          .then(resp => {
            console.log(resp.data)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Hello!',
              text: `Welcome back ${resp.data.payloadUser.email}!`,
              showConfirmButton: false,
              timer: 1500
            })
            localStorage.setItem('access_token', resp.data.access_token)
            context.commit('SET_LOGIN', true)
            resolve()
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Sorry...',
              text: error.response.data.message
            })
            reject(error)
          })
      })
    },
    authGithub: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseURL}/login/auth-github`,
          method: 'post',
          data: {
            code: payload.code
          }
        })
          .then(resp => {
            localStorage.setItem('access_token', resp.data.access_token)
            context.commit('SET_LOGIN', true)
            Swal.fire({
              icon: 'success',
              title: 'Hello!',
              text: `Welcome back!`
            })
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
