import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import LoginGithub from '../views/LoginGithub.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: function (to, from, next) {
      if (!localStorage.access_token) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: function (to, from, next) {
      if (localStorage.access_token) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: function (to, from, next) {
      if (localStorage.access_token) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login/auth-github',
    name: 'LoginGithub',
    component: LoginGithub,
    beforeEnter: function (to, from, next) {
      if (localStorage.access_token) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
