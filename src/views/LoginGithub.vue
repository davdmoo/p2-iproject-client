<template>
  <div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'LoginGithub',
  created: function () {
    Swal.fire({
      title: 'Please wait while we redirect you to our website..',
      timer: 3000
    })
    this.$store.dispatch('authGithub', {
        code: this.$route.query.code
    })
      .then(() => {
          this.$router.push('/')
      })
  }
}
</script>

<style>

</style>