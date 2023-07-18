<template>
  <q-dialog v-model="dialog">
    <q-card id="dialog-forgotPassword">
      <q-card-section class="items-center">
        <h1 class="text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01; color: #3469A7;">Lupa Kata Sandi</h1>
      </q-card-section>
      <q-card-section class="items-center">
        <div class="text-dark q-mb-lg" style="font-size: 14px; line-height: 1.2;">
          Kami akan mengirimkan email petunjuk untuk mengubah kata sandi Anda jika Anda memang terdaftar di sistem kami.
        </div>
        <q-input
          dense
          label="Alamat Email"
          type="email"
          class="q-mb-md"
          v-model="form.username"/>
        <div class="flex justify-end">
          <q-btn
            dense flat no-caps
            class="q-px-xs text-underline text-weight-bolder gtm-track"
            color="primary"
            label="Ingat Password?"
            @click="() => {
              dialog = false
              $emit('login')
            }"
            gtm-action="btn_forgot_password_to_login"/>
        </div>
      </q-card-section>

      <q-card-section :class="itemsCaptcha.imgCaptcha ? 'block' : 'hidden'"  class="q-mx-auto items-center" style="width: 250px;">
        <div class="flex justify-center items-center" style="gap: 16px;">
          <q-img :src="itemsCaptcha.imgCaptcha" spinner-color="white" style="width: 159px; height: 60px;"/>
          <q-icon @click="doGenereteCaptcha" name="img:images/reload.svg" size="sm" class="cursor-pointer" />

        </div>
        <div class="flex justify-center q-my-md">
          <q-input outlined v-model="itemsCaptcha.inputCaptcha" placeholder="Masukan kode verifikasi." dense style="width: 100%;" 
          :error="itemsCaptcha.err_capthcha != null"
          :error-message="itemsCaptcha.err_capthcha"
          maxlength="6"
          />
        </div>
      </q-card-section>

      <q-card-section :class="itemsCaptcha.captcha ? '' : 'q-mt-sm'" class="items-center q-py-none">
        <div class="flex justify-center q-mb-lg">
          <q-btn
            @click="doForgotPassword"
            :loading="loading"
            :disable="loading"
            dense no-caps push
            class="q-py-sm btn-secondary text-weight-bold"
            gtm-action="btn_forgot_password_submit"
            label="Lupa Kata Sandi"
            style="width: 200px; font-size: 20px;"/>
        </div>

        <div class="flex justify-center text-center items-center no-wrap" style="column-gap: 8px; width: 100%;">
          <tr style="width: 100px; height: 1px; background:linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 82%, rgba(0,0,0,1) 100%);"></tr>
          <div class="text-dark txt-md">Atau masuk melalui</div>
          <tr style="width: 100px; height: 1px; transform: rotate(180deg); background:linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 82%, rgba(0,0,0,1) 100%);"></tr>
        </div>

        <SocmedLogin
          @success="
            (user) => {
              dialog = false;
              $q.notify({
                message: 'Selamat datang ' + user.name,
                color: 'positive',
              });
            }
          "
        />
        <div class="text-center txt-lg text-weight-regular">
          <span class="q-mr-xs">Belum Punya Akun?</span>
          <q-btn
            dense
            flat
            no-caps
            v-close-popup
            class="q-px-xs text-underline text-weight-bolder" 
            color="primary"
            label="Daftar"
            @click="
              () => {
                dialog = false;
                $emit('register');
              }
            "
          />
        </div>
        </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import SocmedLogin from "../../components/SocmedLogin.vue";
export default {
  name: 'DialogForgotPassword',
  components: {
    SocmedLogin,
  },
  data () {
    return {
      dialog: false,
      model: null,
      loading: false,

      itemsCaptcha: {
        inputCaptcha: "",
        captcha: null, 
        imgCaptcha: "",
        err_capthcha: null
      },

      form: {
        username: '',
      },

      generete: {
        captcha: null,
      },
    }
  },

  methods: {
    doGenereteCaptcha(){
      this.$services.captcha.generate({},
        (data) => {
          this.itemsCaptcha.imgCaptcha = data.captcha
          this.itemsCaptcha.err_capthcha = null;
        },
      )
    },

    show (model) {
      this.model = model
      this.dialog = true
    },

    doForgotPassword () {
      const {inputCaptcha, imgCaptcha} = this.itemsCaptcha
      
      if(imgCaptcha){
        if(inputCaptcha === "" || inputCaptcha.length <= 0){
          this.itemsCaptcha.err_capthcha = "Harap isi kode verifikasi";
          return;
        };
        this.itemsCaptcha.err_capthcha = null;
        this.generete.captcha = this.itemsCaptcha.inputCaptcha;
      }



      if (!this.$utils.isEmailValid(this.form.username)) {
        return this.$q.notify({
          message: 'Harap masukkan email dengan benar',
          color: 'negative'
        })
      }
      this.loading = true
      
      this.$services.user.forgotPassword({...this.form, ...this.generete}, (data) => {
        this.itemsCaptcha.captcha = false;
        
        this.$q.notify({
          message: 'Harap periksa email Anda',
          color: 'positive'
        })
        this.dialog = false
        this.form.username = "";
        this.itemsCaptcha.err_capthcha = null;
        this.itemsCaptcha.imgCaptcha = "";
        this.itemsCaptcha.inputCaptcha = "";
      }, (msg, errors) => {
        if(msg){
          this.doGenereteCaptcha();
        }

        if(msg === "Captcha Invalid"){
          this.itemsCaptcha.inputCaptcha = "";
          this.itemsCaptcha.err_capthcha = "Harap masukan kode verifikasi dengan benar";
        }

        return this.$q.notify({
          message: 'Harap lengkapi form',
          color: 'negative'
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
