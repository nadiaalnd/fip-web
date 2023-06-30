<template>
  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 480px">
      <q-card-section class="items-center">
        <h1
          class="text-primary text-bold text-center q-ma-none"
          style="font-size: 32px; line-height: 1.01"
        >
          Gabung dan mulai belajar!
        </h1>
      </q-card-section>
      <q-card-section class="items-center">
        <form>
          <div
            class="text-dark text-bold q-mb-md"
            style="font-size: 18px; line-height: 1.01"
          >
            Daftar
          </div>
          <q-input
            dense
            debounce="500"
            label="Nama Lengkap"
            v-model="form.name"
            :error="errors.name != null"
            :error-message="errors.name"
            lazy-rules
            :rules="[
              (val) => nameRegex(val) || 'Nama Hanya Alphabet dan Spasi',
            ]"
          />
          <q-input
            dense
            debounce="500"
            label="Alamat Email"
            type="email"
            v-model="form.email"
            :error="errors.email != null"
            :error-message="errors.email"
          />
          <q-input
            dense
            debounce="500"
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            v-model="form.passwd"
            :error="errors.passwd != null"
            :error-message="errors.passwd"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            dense
            debounce="500"
            label="Konfirmasi Password"
            :type="isRePwd ? 'password' : 'text'"
            v-model="form.repasswd"
            :error="errors.repasswd != null"
            :error-message="errors.repasswd"
          >
            <template v-slot:append>
              <q-icon
                :name="isRePwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isRePwd = !isRePwd"
              />
            </template>
          </q-input>
          <div class="q-mb-sm">
            Dengan mendaftar berarti Anda mematuhi
            <a href="/media/syarat-dan-ketentuan" target="_blank"
              ><b class="text-primary">Syarat dan Ketentuan</b></a
            >
            yang berlaku
          </div>
          <div class="flex">
            <q-btn
              @click="doRegister"
              :loading="loading"
              :disable="loading"
              dense
              no-caps
              push
              class="q-px-sm btn-secondary full-width gtm-track"
              label="Daftar"
              gtm-action="btn_register_submit"
            />
          </div>
        </form>
      </q-card-section>
      <q-card-section class="items-center q-py-none">
        <div class="text-dark txt-sm q-mb-sm">Atau mendaftar dengan:</div>
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
            dense
            flat
            no-caps
            class="q-px-xs text-underline gtm-track"
            label="Masuk"
            @click="
              () => {
                dialog = false;
                $emit('login');
              }
            "
            gtm-action="btn_register_to_login"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import SocmedLogin from "../../SocmedLogin.vue";

export default {
  name: "DialogRegister",
  components: {
    SocmedLogin,
  },
  data() {
    return {
      dialog: false,
      model: null,
      loading: false,
      isCreator: false,
      form: {
        email: "",
        passwd: "",
        repasswd: "",
        name: "",
        request_role: 2,
      },
      errors: {
        email: null,
        passwd: null,
        repasswd: null,
        name: null,
      },

      unique: {
        email: false,
      },

      isPwd: true,
      isRePwd: true,
    };
  },

  methods: {
    nameRegex(name) {
      const regex = /^[a-zA-Z ]+$/;
      return regex.test(name);
    },
    show(model) {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = "";
        this.errors[key] = null;
      });

      this.unique.email = false;

      this.model = model;
      this.dialog = true;
    },

    doRegister() {
      if (!this.isFormValid()) {
        return;
      }

      this.form.request_role = this.isCreator ? 3 : 2;
      this.loading = true;
      this.$services.user.register(
        this.form,
        (data) => {
          this.$q.notify({
            message:
              "Berhasil daftar, harap periksa email untuk verifikasi email",
            color: "positive",
          });
          
          this.$utils.saveToken(data.token);
          this.$utils.saveUser(data);
          this.$global.$emit("user", data);
          this.dialog = false;

          let nextPath = this.$route?.query?.next
          if (nextPath) {
            this.$router.push(nextPath)
          }
        },
        (msg, errors) => {
          this.$q.notify({
            message:
              "Email sudah pernah digunakan, harap coba dengan email lain",
            color: "negative",
          });
        },
        () => {
          this.loading = false;
        }
      );
    },

    isFormValid() {
      const form = this.form;
      var isValid = true;

      if (form.email == "" || !this.$utils.isEmailValid(form.email)) {
        isValid = false;
        this.errors.email = "Harap isi email dengan benar";
      } else if (!this.unique.email) {
        this.errors.email = "Email tidak tersedia / sudah terdaftar";
      } else {
        this.errors.email = null;
      }
      if (form.passwd == "" || form.passwd.length < 6) {
        isValid = false;
        this.errors.passwd = "Harap isi password (min 6 karakter)";
      } else {
        this.errors.passwd = null;
      }
      if (form.repasswd != form.passwd) {
        isValid = false;
        this.errors.repasswd = "Konfirmasi password tidak sesuai";
      } else {
        this.errors.repasswd = null;
      }
      if (form.name == "" || form.name.length < 3) {
        isValid = false;
        this.errors.name = "Harap isi nama (min 3 karakter)";
      } else {
        this.errors.name = null;
      }
      if (!isValid) {
        this.$q.notify({
          message: "Harap lengkapi form",
          color: "negative",
        });
      }
      return isValid;
    },

    checkUnique(key, val, label) {
      console.log("checkUnique", key, val);
      if (this.$utils.isEmpty(val)) {
        this.errors[key] = null;
        return;
      }
      const form = {};
      form[key] = val;
      this.unique[key] = false;
      this.$services.user.checkUnique(
        form,
        (data) => {
          console.log(data);
          if (!data.valid) {
            this.errors[key] = label + " tidak valid";
          } else if (!data.unique) {
            this.errors[key] = label + " tidak tersedia / sudah terdaftar";
          } else {
            this.unique[key] = true;
          }
        },
        (msg, error) => {},
        () => {}
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
    "form.email": function (newVal) {
      this.errors.email = null;
      this.checkUnique("email", newVal, "Email");
    },
  },
};
</script>
