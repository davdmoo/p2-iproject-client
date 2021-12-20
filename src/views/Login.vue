<template>
  <div class="container bg-light rounded d-flex justify-content-center" style="max-width: 400px; margin-top: 16rem;">
    <div class="login-form">
      <div style="margin: 10px;"><br>
          <h2 style="text-align: center">Login</h2>
      </div>
      <form style="margin: 10px;" @submit.prevent="login">
          <div class="form-group">
              <label for="email">Email</label>
              <input v-model="email" type="text" class="form-control" id="email" placeholder="Enter email">
          </div>
          <div class="form-group">
              <label for="password">Password</label>
              <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <a style="margin-left: 70px;" class="btn btn-success" href="https://github.com/login/oauth/authorize?client_id=ade64a4c4836b49e76eb">Github Sign-in</a>
      </form><br>

      <p>Feel like you don't belong? Register <a href="/register" @click.prevent="showRegister">here</a></p><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(() => {
            this.$router.push('/')
        })

      this.email = ''
      this.password = ''
    },
    showRegister: function () {
        this.$router.push('register')
    },
    authGithub: function () {
      this.$store.dispatch('authGithub')
    }
  }
}
</script>

<style>

</style>