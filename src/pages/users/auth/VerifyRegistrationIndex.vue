<template>
  <q-page class="flex flex-center">
    <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md"/>
    Memverifikasi
  </q-page>
</template>

<script>
export default {
  mounted () {
    const token = this.$route.query.token
    this.$services.user.verify(token, (data) => {
      console.log(data)
      this.$q.notify({
        message: 'Email berhasil diverifikasi, harap masuk menggunakan email dan password terdaftar',
        color: 'positive',
        timeOut: 5000
      })
    }, (msg, errors) => {
      this.$q.notify({
        message: 'Link verifikasi salah, harap periksa email Anda',
        color: 'negative'
      })
    }, () => {
      this.$router.replace({
        path: "/"
      })
    })
  }
}
</script>
