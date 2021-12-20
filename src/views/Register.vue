<template>
  <div class="container bg-light rounded d-flex justify-content-center mx-auto" style="max-width: 400px; margin-top: 16rem">
    <div class="register-form">
      <div style="margin: 10px"><br>
        <h2 style="text-align: center">Register</h2>
      </div>
      <form style="margin: 10px;" @submit.prevent="register">
        <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="text" class="form-control" id="email" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" class="form-control" placeholder="Min. 8 characters">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form><br>
      
      <p>Having a dejavu? Sign-in <a href="/login" @click.prevent="showLogin">here</a></p><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    showLogin: function () {
      this.$router.push('login')
    },
    register: function () {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>

<style>

</style>