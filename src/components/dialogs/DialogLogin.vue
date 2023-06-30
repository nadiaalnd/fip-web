<template>
  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 480px">
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
          <div class="flex">
            <q-checkbox
              v-model="rememberMe"
              label="Remember Me"
              color="black"
            />
            <div class="flex-1"></div>
            <q-btn
              dense flat no-caps
              class="q-px-xs text-underline gtm-track"
              color="primary"
              label="Lupa Password?"
              @click="
                () => {
                  dialog = false;
                  $emit('forgot');
                }
              "
              gtm-action="btn_login_to_forgot_password"/>
          </div>
          <div class="q-mb-md">
            <i class="text-negative">*</i> Dengan mendaftar / masuk berarti Anda
            mematuhi
            <a href="/media/syarat-dan-ketentuan" target="_blank"
              ><b class="text-primary">Syarat dan Ketentuan</b></a
            >
            yang berlaku
          </div>
          <div class="flex">
            <q-btn
              @click="doLogin"
              :loading="loading"
              :disable="loading"
              dense no-caps push
              class="q-px-sm btn-secondary gtm-track"
              label="Masuk"
              gtm-action="btn_login_submit"
            />
          </div>
        </form>
      </q-card-section>
      <q-card-section class="items-center q-py-none">
        <div class="text-dark txt-sm q-mb-sm">Masuk / daftar akun melalui</div>
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
        <div>
          <span class="q-mr-xs">Belum Punya Akun?</span>
          <q-btn
            dense flat no-caps v-close-popup
            class="q-px-xs text-underline gtm-track"
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

      form: {
        username: "",
        passwd: "",
      },

      isPwd: true,

      rememberMe: false,
    };
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

    doLogin() {
      this.loading = true;
      this.$services.user.login(
        this.form,
        (data) => {
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
        (msg, errors) => {
          this.$q.notify({
            message: "Harap periksa username & password",
            color: "negative",
          });
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
  },
};
</script>
