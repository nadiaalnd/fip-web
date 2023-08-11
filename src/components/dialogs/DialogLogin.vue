<template>
  <q-dialog v-model="dialog">
    <q-card id="dialog-login">
      <q-card-section class="items-center">
        <h1
          class="text-primary text-bold text-center q-ma-none"
          style="font-size: 32px; line-height: 1.01"
        >
          Bergabung Bersama Kami
        </h1>
      </q-card-section>
      <q-card-section class="items-center">
        <form>
          <div
            class="text-dark text-bold q-mb-md"
            style="font-size: 18px; line-height: 1.01"
          >
            Masuk
          </div>
          <div class="row --row-margin q-mb-sm">
            <div class="col-12 q-mb-sm">
              <q-input
                dense
                label="Alamat Email"
                type="email"
                v-model="form.username"
              />
            </div>
            <div class="col-12 q-mb-sm">
              <q-input
                dense
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                v-model="form.passwd"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <q-btn
            style="font-weight: 800"
            dense
            flat
            no-caps
            class="q-px-xs text-underline q-mb-lg gtm-track"
            color="primary"
            label="Lupa Password?"
            gtm-action="btn_login_to_forgot_password"
            @click="
              () => {
                dialog = false;
                $emit('forgot');
              }
            "
          />
          <div :class="imgCaptcha ? 'block' : 'hidden'" class="q-mx-auto q-mb-lg" style="width: 250px;">
            <div class="flex justify-center items-center" style="gap: 16px;">
              <q-img :src="imgCaptcha" spinner-color="white" style="width: 159px; height: 60px;"/>
              <q-icon @click="doGenerateCaptcha" name="img:images/reload.svg" size="sm" class="cursor-pointer" />
            </div>
            <div class="flex justify-center q-my-md">
              <q-input outlined v-model="form.captcha" placeholder="Masukan kode verifikasi." dense style="width: 90%;"
                :error="errors.captcha != null"
                :error-message="errors.captcha"
                maxlength="6"
                for="input-verification-code"/>
            </div>
          </div>

          <div class="q-mb-md txt-md">
            Dengan mendaftar / masuk berarti Anda mematuhi
            <a
              class="text-underline"
              href="/media/syarat-dan-ketentuan"
              target="_blank"
              ><b class="text-primary text-weight-bolder"
                >Syarat dan Ketentuan</b
              ></a
            >
            yang berlaku
          </div>
          <div class="flex justify-center q-mb-md">
            <q-btn
              @click="doLogin"
              :loading="loading"
              :disable="loading"
              dense no-caps push
              class="q-px-sm btn-secondary btn-large gtm-track"
              label="Masuk"
              gtm-action="btn_login_submit"
              style="width: 200px;"
            />
          </div>
        </form>
      </q-card-section>
      <q-card-section class="items-center q-py-none">
        <div
          class="flex justify-center text-center items-center no-wrap"
          style="column-gap: 8px; width: 100%"
        >
          <tr
            style="
              width: 100px;
              height: 1px;
              background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 1) 0%,
                rgba(0, 0, 0, 1) 82%,
                rgba(0, 0, 0, 1) 100%
              );
            "
          ></tr>
          <div class="text-dark txt-md">Atau masuk melalui</div>
          <tr
            style="
              width: 100px;
              height: 1px;
              transform: rotate(180deg);
              background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 1) 0%,
                rgba(0, 0, 0, 1) 82%,
                rgba(0, 0, 0, 1) 100%
              );
            "
          ></tr>
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
            dense flat no-caps v-close-popup
            class="q-px-xs text-underline gtm-track text-weight-bolder"
            color="primary"
            label="Daftar"
            @click="
              () => {
                dialog = false;
                $emit('register');
              }
            "
            gtm-action="btn_login_to_register"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import SocmedLogin from "../../components/SocmedLogin.vue";
import CryptoJS from "crypto-js";

export default {
  name: "DialogLogin",
  components: {
    SocmedLogin,
  },
  data() {
    return {
      dialog: false,
      model: null,
      loading: false,
      disableBtn: true,
      imgCaptcha: null,

      form: {
        username: "",
        passwd: "",
        captcha: null
      },

      errors: {
        username: null,
        passwd: null,
        captcha: null
      },

      generate: {
        captcha: null,
      },

      isPwd: true,

      rememberMe: false,
    };
  },

  computed: {
    formInput() {
      return {
        username: this.form.username,
        password: this.form.passwd,
        inputCaptcha: this.form.captcha,
      };
    },
  },

  mounted() {
    if (localStorage.getItem("remember_me")) {
      const decrypt = this.decrypt(localStorage.getItem("remember_me"));
      const decryptData = JSON.parse(decrypt);
      this.rememberMe = true;
      this.form.username = decryptData.username;
      this.form.passwd = decryptData.passwd;
    }
  },

  methods: {
    show(model) {
      this.model = model;
      this.dialog = true;
    },

    doGenerateCaptcha(){
      this.$services.captcha.generate({},
        (data) => {
          this.imgCaptcha = data.captcha
        },
      )
    },

    doLogin() {
      const {passwd, username, captcha} = this.form;
      if(!passwd || !username){
        return this.$q.notify({
          message: "Harap lengkapi form",
          color: "negative",
        });
      }

      if(this.imgCaptcha){
        if(captcha === "" || captcha.length <= 0){
          this.errors.captcha = "Harap isi kode verifikasi";
          return;
        }

        this.errors.captcha = null;
      }

      this.loading = true;
      this.$services.user.login(
        this.form,
        (data) => {
          this.form.passwd = "";
          this.form.username = "";
          this.form.captcha = "";
          this.imgCaptcha = "";
          this.errors.captcha = null

          this.$utils.saveToken(data.token);
          this.$utils.saveUser(data);
          this.$q.notify({
            message: "Selamat datang " + data.name,
            color: "positive",
          });
          this.$global.$emit("user", data);
          if (this.rememberMe) {
            localStorage.setItem("remember_me", this.encrypt());
          } else {
            localStorage.removeItem("remember_me");
          }
          this.dialog = false;

          let nextPath = this.$route?.query?.next
          if (nextPath) {
            this.$router.push(nextPath)
          }
        },
        (msg, errors, raw) => {
          let message = "Harap periksa username & password"

          if (raw.response?.status == 401) {
            this.form.captcha = ""
            this.errors.captcha = "Harap masukan kode verifikasi"
            message = "Harap masukan kode verifikasi"
            this.doGenerateCaptcha()
          } else if(msg === "Captcha Invalid") {
            this.form.captcha = ""
            this.errors.captcha = "Harap masukan kode verifikasi dengan benar"
            message = "Harap masukan kode verifikasi dengan benar"
            this.doGenerateCaptcha()
          } else if (this.imgCaptcha) {
            this.doGenerateCaptcha()
          }

          this.$q.notify({
            message: message,
            color: "negative",
          })
        },
        () => {
          this.loading = false;
        }
      );
    },

    encrypt() {
      const secretKey = "bPeShVmYq3t6v9y$";
      return CryptoJS.AES.encrypt(
        JSON.stringify(this.form),
        secretKey
      ).toString();
    },

    decrypt(cipher) {
      const secretKey = "bPeShVmYq3t6v9y$";
      return CryptoJS.AES.decrypt(cipher, secretKey).toString(
        CryptoJS.enc.Utf8
      );
    },
  },

  watch: {
    dialog: function (newVal) {
      window.parent.postMessage(
        {
          iframe: "ms-if2",
          show: newVal,
        },
        "*"
      );
    },

    formInput:{
      handler: function(value){
        if(value){
          const {username, password, inputCaptcha} = value;

          if(!username || !password || !inputCaptcha){
            this.disableBtn = true
          } else {
            this.disableBtn = false
          }
        }
      }
    }
  },
};
</script>
