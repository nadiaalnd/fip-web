<template>
  <q-page class="q-py-md flex flex-center">
    <div class="container q-px-md flex column flex-center">
      <q-card-section class="items-center">
        <h1 class="text-primary text-bold text-center q-ma-none" style="font-size: 32px;">Pulihkan Kata Sandi</h1>
      </q-card-section>
      <div
        style="width: 400px">
        <q-input
          dense
          class="q-mb-md"
          label="Kata Sandi Baru"
          type="password"
          v-model="form.passwd"
          :error="errors.passwd != null"
          :error-message="errors.passwd"/>
        <q-input
          dense
          class="q-mb-md"
          label="Konfirmasi Kata Sandi Baru"
          type="password"
          v-model="form.repasswd"
          :error="errors.repasswd != null"
          :error-message="errors.repasswd"/>
        <div class="text-right">
          <q-btn
            @click="resetPassword"
            :loading="loading"
            :disable="loading"
            dense no-caps unelevated
            class="q-px-sm gtm-track"
            color="primary"
            label="Ubah Kata Sandi"
            gtm-action="btn_forgot_password_submit"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      form: {
        passwd: '',
        repasswd: ''
      },
      errors: {
        passwd: null,
        repasswd: null
      },
      loading: false
    }
  },

  methods: {
    isFormValid () {
      const form = this.form
      var isValid = true

      if (form.passwd == '' || form.passwd.length < 6) {
        isValid = false
        this.errors.passwd = 'Harap isi password (min 6 karakter)'
      } else {
        this.errors.passwd = null
      }
      if (form.repasswd != form.passwd) {
        isValid = false
        this.errors.repasswd = 'Konfirmasi password tidak sesuai'
      } else {
        this.errors.repasswd = null
      }

      if (!isValid) {
        this.$q.notify({
          message: 'Harap lengkapi form',
          color: 'negative'
        })
      }
      return isValid
    },

    resetPassword () {
      if (!this.isFormValid()) {
        return
      }
      this.$utils.logoutUser()
      this.$utils.saveToken(this.$route.query.token)

      this.loading = true
      this.$services.user.resetPassword(this.form, (data) => {
        this.$utils.logoutUser()
        this.$q.notify({
          message: 'Berhasil ubah kata sandi, silakan masuk dengan kata sandi baru',
          color: 'positive'
        })
        this.$router.replace({
          path: "/"
        })
      }, (msg, errors) => {
        this.$utils.logoutUser()
        this.$q.notify({
          message: 'Harap coba lagi nanti atau coba kirim email forgot password lagi',
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
    }
  }
}
</script>
