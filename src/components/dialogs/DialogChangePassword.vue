<template>
  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 720px; max-width: calc(100% - 32px)">
      <q-card-section class="items-center">
        <h1 class="text-primary text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01;">Ubah Kata Sandi</h1>
      </q-card-section>
      <q-card-section class="items-center">
        <q-input
          dense
          class="q-mb-sm"
          label="Kata Sandi Lama"
          type="password"
          v-model="form.passwd_old"
          :error="errors.passwd_old != null"
          :error-message="errors.passwd_old"/>
        <q-input
          dense
          class="q-mb-sm"
          label="Kata Sandi Baru"
          type="password"
          v-model="form.passwd"
          :error="errors.passwd != null"
          :error-message="errors.passwd"/>
        <q-input
          dense
          class="q-mb-sm"
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
            gtm-action="btn_change_password"/>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,

      form: {
        passwd_old: '',
        passwd: '',
        repasswd: ''
      },
      errors: {
        passwd_old: null,
        passwd: null,
        repasswd: null
      },
      loading: false
    }
  },

  methods: {
    show () {
      this.dialog = true

      Object.keys(this.errors).forEach((key) => {
        this.errors[key] = null
      })
      Object.keys(this.form).forEach((key) => {
        this.form[key] = ''
      })

    },
    isFormValid () {
      const form = this.form
      var isValid = true

      if (form.passwd_old == '' || form.passwd_old.length < 6) {
        isValid = false
        this.errors.passwd_old = 'Harap isi password saat ini (min 6 karakter)'
      } else {
        this.errors.passwd_old = null
      }
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

      this.loading = true
      this.$services.user.resetPassword(this.form, (data) => {
        this.$q.notify({
          message: 'Berhasil ubah kata sandi, silakan masuk dengan kata sandi baru',
          color: 'positive'
        })
        this.dialog = false
      }, (msg, errors) => {
        this.errors.passwd_old = 'Kata Sandi Salah'
        this.$q.notify({
          message: 'Harap periksa kata sandi lama Anda',
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
    }
  }
}
</script>
