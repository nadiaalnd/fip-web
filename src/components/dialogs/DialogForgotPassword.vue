<template>
  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 720px; max-width: calc(100% - 32px)">
      <q-card-section class="items-center">
        <h1 class="text-secondary text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01;">Lupa Kata Sandi</h1>
      </q-card-section>
      <q-card-section class="items-center">
        <div class="text-dark q-mb-md" style="font-size: 14px; line-height: 1.2;">
          Kami akan mengirimkan email petunjuk untuk mengubah kata sandi Anda jika Anda memang terdaftar di sistem kami.
        </div>
        <q-input
          dense
          label="Alamat Email"
          type="email"
          class="q-mb-md"
          v-model="form.username"/>
        <div class="flex">
          <q-btn
            @click="doForgotPassword"
            :loading="loading"
            :disable="loading"
            dense no-caps push
            class="q-px-sm btn-secondary gtm-track"
            label="Lupa Kata Sandi"
            gtm-action="btn_forgot_password_submit"/>
          <div class="flex-1">
          </div>
          <q-btn
            dense flat no-caps
            class="q-px-xs text-underline gtm-track"
            color="primary"
            label="Ingat Password?"
            @click="() => {
              dialog = false
              $emit('login')
            }"
            gtm-action="btn_forgot_password_to_login"/>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogForgotPassword',
  data () {
    return {
      dialog: false,
      model: null,
      loading: false,

      form: {
        username: ''
      }
    }
  },

  methods: {
    show (model) {
      this.model = model
      this.dialog = true
    },

    doForgotPassword () {
      if (!this.$utils.isEmailValid(this.form.username)) {
        return this.$q.notify({
          message: 'Harap masukkan email dengan benar',
          color: 'negative'
        })
      }
      this.loading = true
      this.$services.user.forgotPassword(this.form, (data) => {
        this.$q.notify({
          message: 'Harap periksa email Anda',
          color: 'positive'
        })
        this.dialog = false
      }, (msg, errors) => {
        this.$q.notify({
          message: 'Harap periksa email Anda',
          color: 'positive'
        })
      }, () => {
        this.loading = false
      })
    }
  },

  watch: {
    dialog: function (newVal) {
      window.parent.postMessage({
        iframe: 'ms-if2',
        show: newVal
      }, '*')
    }
  }
}
</script>
