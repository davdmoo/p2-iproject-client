<template>
  <div id="app">
    <Navbar v-if="isLoggedIn" @logout="logout"></Navbar>
    <router-view/>
    <Footer v-if="isLoggedIn"></Footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from 'vue-hacktiv8-footer'
import Swal from 'sweetalert2'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  created: function () {
    if (localStorage.access_token) {
      this.$store.commit('SET_LOGIN', true)
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    logout: function () {
      localStorage.clear()
      Swal.fire('You have signed out.')
      this.$store.commit('SET_LOGIN')
      this.$router.push('login')
    }
  }
}
</script>

<style>
body {
  background-color: #150b28
}
</style>
