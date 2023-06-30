<template>
  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 720px;">
      <q-card-section class="items-center">
        <h1 class="text-primary text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01;">Gabung dan mulai belajar!</h1>
      </q-card-section>
      <q-card-section class="items-center">
        <form>
          <div class="text-dark text-bold q-mb-md" style="font-size: 18px; line-height: 1.01;">Daftar</div>
          <div class="row --row-margin">
            <div
              class="col-12 col-sm-6 q-mb-sm">
              <q-input
                dense stack-label
                debounce="500"
                label="Username"
                v-model="form.username"
                :error="errors.username != null"
                :error-message="errors.username">
                <template v-slot:prepend>
                  <q-icon name="info" color="info">
                    <q-tooltip>
                      <div>
                        <div>
                          > minimal 5 - 20 karakter
                        </div>
                        <div>
                          > diawali oleh huruf kecil
                        </div>
                        <div>
                          > hanya boleh huruf kecil dan angka
                        </div>
                      </div>
                    </q-tooltip>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div
              class="col-12 col-sm-6 q-mb-sm">
              <q-input
                dense
                debounce="500"
                label="Alamat Email"
                type="email"
                v-model="form.email"
                :error="errors.email != null"
                :error-message="errors.email"/>
            </div>
          </div>
          <div class="row --row-margin">
            <div
              class="col-12 col-sm-6 q-mb-sm">
              <q-input
                dense
                debounce="500"
                label="Nama Lengkap"
                v-model="form.name"
                :error="errors.name != null"
                :error-message="errors.name"/>
            </div>
            <div
              class="col-12 col-sm-6 q-mb-sm">
              <q-input
                dense
                debounce="500"
                label="Nomor HP"
                type="telp"
                v-model="form.phone"
                :error="errors.phone != null"
                :error-message="errors.phone"/>
            </div>
          </div>
          <div class="row --row-margin">
            <div
              class="col-12 col-sm-6 q-mb-sm">
              <q-input
                dense
                debounce="500"
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                v-model="form.passwd"
                :error="errors.passwd != null"
                :error-message="errors.passwd">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div
              class="col-12 col-sm-6 q-mb-sm">
              <q-input
                dense
                debounce="500"
                label="Konfirmasi Password"
                :type="isRePwd ? 'password' : 'text'"
                v-model="form.repasswd"
                :error="errors.repasswd != null"
                :error-message="errors.repasswd">
                <template v-slot:append>
                  <q-icon
                    :name="isRePwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isRePwd = !isRePwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row --row-margin q-mb-md">
            <div>
              <q-item dense class="q-px-none">
                <q-checkbox dense v-model="isCreator" val="true" class="q-mr-md" />
                <q-item-section>
                  <q-item-label>Aktifkan halaman kreator</q-item-label>
                  <q-item-label caption>Anda akan dapat membuat membuat konten di Finplan</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div class="flex">
            <q-btn
              @click="doRegister"
              :loading="loading"
              :disable="loading"
              dense no-caps push
              class="q-px-sm btn-secondary gtm-track"
              label="Daftar"
              gtm-action="btn_register_submit"/>
          </div>
        </form>
      </q-card-section>
      <q-card-section class="items-center q-py-none">
        <div class="text-dark txt-sm q-mb-sm">
          Atau mendaftar dengan:
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
        <div>
          <span class="q-mr-xs">Sudah Punya Akun?</span>
          <q-btn
            dense flat no-caps
            class="q-px-xs text-underline gtm-track"
            label="Masuk"
            @click="() => {
              dialog = false
              $emit('login')
            }"
            gtm-action="btn_register_to_login"/>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import SocmedLogin from 'components/SocmedLogin'

export default {
  name: 'DialogRegister',
  components: {
    SocmedLogin
  },
  data () {
    return {
      dialog: false,
      model: null,
      loading: false,
      isCreator: false,
      form: {
      	email:'',
      	passwd:'',
      	repasswd:'',
        name:'',
        phone:'',
        username:'',
        request_role: 2
      },
      errors: {
      	username:null,
      	email:null,
      	passwd:null,
      	repasswd:null,
        name:null,
        phone:null,
        username:null
      },

      unique: {
        username: false,
        email: false
      },

      isPwd: true,
      isRePwd: true
    }
  },

  methods: {
    show (model) {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = ''
        this.errors[key] = null
      })

      this.unique.username = false
      this.unique.email = false

      this.model = model
      this.dialog = true
    },

    doRegister () {
      if (!this.isFormValid()) {
        return
      }

      this.form.request_role = this.isCreator ? 3 : 2
      this.loading = true
      this.$services.user.register(this.form, (data) => {
        this.$q.notify({
          message: 'Berhasil daftar, harap periksa email untuk verifikasi email',
          color: 'positive'
        })
        this.dialog = false

        this.$utils.saveToken(data.token);
        this.$utils.saveUser(data);
        let nextPath = this.$route?.query?.next
        if (nextPath) {
          this.$router.push(nextPath)
        }
      }, (msg, errors) => {
        this.$q.notify({
          message: 'Email sudah pernah digunakan, harap coba dengan email lain',
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
    },

    isFormValid () {
      const form = this.form
      var isValid = true

      if (form.username == '') {
        isValid = false
        this.errors.username = 'Harap isi username'
      } else if (!this.unique.username) {
        this.errors.username = 'Username tidak tersedia / sudah terdaftar'
      } else {
        this.errors.username = null
      }
      if (form.email == '' || !this.$utils.isEmailValid(form.email)) {
        isValid = false
        this.errors.email = 'Harap isi email dengan benar'
      } else if (!this.unique.email) {
        this.errors.email = 'Email tidak tersedia / sudah terdaftar'
      } else {
        this.errors.email = null
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
      if (form.name == '' || form.name.length < 3) {
        isValid = false
        this.errors.name = 'Harap isi nama (min 3 karakter)'
      } else {
        this.errors.name = null
      }
      if (!this.$utils.isPhoneValid(form.phone, '0')) {
        isValid = false
        this.errors.phone = 'Harap isi no ponsel dengan benar'
      } else {
        this.errors.phone = null
      }
      if (!isValid) {
        this.$q.notify({
          message: 'Harap lengkapi form',
          color: 'negative'
        })
      }
      return isValid
    },

    checkUnique (key, val, label) {
      const form = {}
      form[key] = val
      this.unique[key] = false
      this.$services.user.checkUnique(form, (data) => {
        console.log(data)
        if (!data.valid) {
          this.errors[key] = label + ' tidak valid'
        } else if (!data.unique) {
          this.errors[key] = label + ' tidak tersedia / sudah terdaftar'
        } else {
          this.unique[key] = true
        }
      }, (msg, error) => {

      }, () => {
      })
    }
  },

  watch: {
    dialog: function (newVal) {
      window.parent.postMessage({
        iframe: 'ms-if2',
        show: newVal
      }, '*')
    },

    'form.username': function (newVal) {
      this.errors.username = null
      this.checkUnique('username', newVal, 'Username')
    },
    'form.email': function (newVal) {
      this.errors.email = null
      this.checkUnique('email', newVal, 'Email')
    }
  }
}
</script>
