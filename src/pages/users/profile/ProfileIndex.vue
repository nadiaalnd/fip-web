<template>
  <q-page class="q-py-md">
    <div class="container q-py-md">
      <div class="row">
        <div class="col-12 col-lg-4 q-mb-md q-px-md">
          <h1
            class="text-primary q-ma-none text-bold"
            style="font-size: 32px; line-height: 1.01"
          >
            Profil Saya
          </h1>
          <div class="q-py-md">
            <div class="full-width q-mb-sm">
              <q-input
                dense
                label="Nama Lengkap"
                v-model="form.name"
                lazy-rules
                :rules="[
                  (val) => nameRegex(val) || 'Nama Hanya Alphabet dan Spasi',
                ]"
              />
            </div>
            <div class="row --row-margin">
              <div class="col-12 col-sm-6 q-mb-sm">
                <q-input
                  @keyup="
                    (e) => (e.target.value = e.target.value.toLowerCase())
                  "
                  dense
                  label="Username"
                  v-model="form.username"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length >= 5) ||
                      'Username minimal 5 karakter / angka',
                    (val) => val.length <= 32 || 'Username maximal 32 karakter',
                    (val) =>
                      isNaN(val[0]) ||
                      'Username tidak tersedia, harap coba username lain',
                  ]"
                />
              </div>
              <div class="col-12 col-sm-6 q-mb-sm">
                <q-input dense readonly label="Email" v-model="form.email" />
              </div>
            </div>
            <div class="row --row-margin">
              <div class="col-12 col-sm-6 q-mb-sm">
                <q-input
                  dense
                  stack-label
                  label="Tanggal Lahir"
                  type="date"
                  v-model="form.dob"
                  :max="this.birthDate.currentDate.toISOString().slice(0, 10)"
                  lazy-rules
                  :rules="[
                    (val) =>
                      new Date(val).getTime() <=
                        birthDate.eighteenYears.getTime() ||
                      'Usia Minimal 18 Tahun',
                  ]"
                />
              </div>
              <div class="col-12 col-sm-6 q-mb-sm">
                <q-input
                  dense
                  label="Nomor HP"
                  type="tel"
                  mask="###########"
                  :prefix="prefix"
                  v-model="form.phone"
                />
              </div>
            </div>
          </div>
          <q-btn
            dense no-caps unelevated
            color="primary"
            class="q-px-sm q-mb-md gtm-track"
            label="Simpan"
            size="md"
            @click="saveProfile"
            :loading="loading"
            :disable="loading"
            gtm-action="btn_profile_save"
          />
          <div>
            <q-btn
              dense no-caps flat
              color="primary"
              class="q-px-sm gtm-track"
              label="Keluar?"
              size="md"
              @click="doLogout"
              gtm-action="btn_profile_logout"
            />
            <q-btn
              dense
              no-caps
              flat
              color="primary"
              class="q-px-sm q-ml-md"
              label="Ganti Password?"
              size="md"
              @click="changePassword"
              gtm-action="btn_profile_change_password"
            />
          </div>
        </div>
        <div class="col-12 col-lg-8 q-px-md">
          <div
            class="border-bottom q-mb-md"
            v-if="organizations && organizations.length > 0"
          >
            <div class="q-mb-lg">
              <h1
                class="text-primary q-ma-none text-bold inline-block vertical-middle"
                style="font-size: 32px; line-height: 1.01"
              >
                Halaman Kreatorku
              </h1>
            </div>
            <ItemOrganization
              v-for="(org, idx) in organizations"
              :key="'org-' + idx"
              :org="org"
            >
            </ItemOrganization>
          </div>
          <div class="border-bottom q-mb-md">
            <div class="home-section">
              <q-icon name="subscriptions" color="primary" size="sm" />
              <h2>Paket berlangganan</h2>
            </div>
            <div v-if="packages.length > 3 && !showMore" class="col-2">
              <q-btn
                dense
                no-caps
                flat
                color="primary"
                class="q-px-sm float-right"
                label="Selengkapnya"
                size="md"
                @click="showMore = true"
              />
            </div>
            <div v-if="packages.length > 3 && showMore" class="col-2">
              <q-btn
                dense
                no-caps
                flat
                color="primary"
                class="q-px-sm float-right"
                label="Tutup"
                size="md"
                @click="showMore = false"
              />
            </div>
            <div class="q-mb-lg row">
              <div
                v-if="packages == null || packages.length == 0"
                class="flex-center"
                style="
                  width: 100%;
                  height: 128px;
                  color: #757575;
                  display: flex;
                "
              >
                Yaaah... belum pernah beli paket :(
              </div>
              <template
                v-if="packages.length < 3 || (packages.length > 3 && !showMore)">
                <q-card
                  v-for="(pkg, idx) in packages"
                  :key="'paket-' + idx"
                  :class="
                    (pkg.is_active ? 'active' : '') +
                    ' purchased-package q-ma-sm cursor-pointer'
                  "
                  @click="hasActivePackage ? packageItemClicked(pkg) : null">
                  <div class="row flex-center">
                    <h2 class="--title q-pr-md flex-1">
                      {{ pkg.name }}
                    </h2>
                    <q-chip
                      v-if="pkg.is_active"
                      dense
                      size="sm"
                      class="text-white q-px-sm q-py-xs"
                      label="aktif"
                      color="positive"
                    />
                    <q-chip
                      v-else
                      dense
                      size="sm"
                      class="text-white q-px-sm q-py-xs"
                      label="Kadaluarsa"
                      color="negative"
                    />
                  </div>
                  <div v-if="pkg.price == 0">Gratis</div>
                  <div v-else>
                    Rp {{ pkg.price.toLocaleString() }}
                  </div>
                  <div class="text-right" style="font-size: 12px">
                    {{ $utils.getFullDate(pkg.dt_end, false) }}
                  </div>
                  <q-btn
                    v-if="!hasActivePackage"
                    @click="onClickPackage(pkg)"
                    dense unelevated no-caps
                    color="primary"
                    class="full-width q-mt-md gtm-track"
                    label="Beli Lagi"
                    gtm-action="btn_profile_buy_again"
                  />
                </q-card>
              </template>
              <template v-else>
                <q-card
                  v-for="(pkg, idx) in packages"
                  :key="'paket-' + idx"
                  :class="
                    (packages[idx].is_active ? 'active' : '') +
                    ' purchased-package q-ma-sm cursor-pointer'
                  "
                  @click="
                    hasActivePackage ? packageItemClicked(packages[idx]) : null
                  "
                >
                  <div class="row flex-center">
                    <h2 class="--title q-pr-md flex-1">
                      {{ packages[idx].name }}
                    </h2>
                    <q-chip
                      v-if="packages[idx].is_active"
                      dense
                      size="sm"
                      class="text-white q-px-sm q-py-xs"
                      label="aktif"
                      color="positive"
                    />
                    <q-chip
                      v-else
                      dense
                      size="sm"
                      class="text-white q-px-sm q-py-xs"
                      label="Kadaluarsa"
                      color="negative"
                    />
                  </div>
                  <div v-if="pkg.price == 0">Gratis</div>
                  <div v-else>
                    Rp {{ pkg.price.toLocaleString() }}
                  </div>
                  <div class="text-right" style="font-size: 12px">
                    {{ $utils.getFullDate(packages[idx].dt_end, false) }}
                  </div>
                  <q-btn
                    v-if="!hasActivePackage"
                    @click="onClickPackage(packages[idx])"
                    dense unelevated no-caps
                    color="primary"
                    class="full-width q-mt-md"
                    label="Beli Lagi"
                    gtm-action="btn_profile_buy_again gtm-track"
                  />
                </q-card>
              </template>
            </div>
            <SectionProduct
              :id="content.code"
              class="q-mb-md"
              v-for="(content, idx) in sections"
              :key="'on-progress-' + idx"
              :content="content"
            />
          </div>
        </div>
      </div>
    </div>
    <DialogChangePassword ref="dialogChangePassword" />
  </q-page>
</template>

<script>
import SectionProduct from "components/SectionProduct";
import DialogChangePassword from "components/dialogs/DialogChangePassword";
import ItemOrganization from "components/items/ItemOrganization";

export default {
  name: "ProfileIndex",

  components: {
    SectionProduct,
    DialogChangePassword,
    ItemOrganization,
  },

  data() {
    return {
      showMore: false,
      organizations: [],
      searchQuery: "",
      prefix: "+62",

      sections: [
        {
          icon: "school",
          icon_name: "school",
          placeholder: "Belum Mendaftar Akademi",
          showPlaceholder: true,
          code: "Akademi",
          products: [],
          host: process.env.HOST,
        },
        {
          icon: "bookmark",
          icon_name: "bookmark",
          placeholder: "Belum ada konten yang dibookmark nih",
          showPlaceholder: true,
          code: "Bookmark",
          products: [],
          host: process.env.HOST,
        },
      ],

      packages: [],
      hasActivePackage: false,

      loading: false,

      form: {
        id: null,
        username: null,
        email: null,
        name: null,
        phone: null,
        dob: null,
        avatar: null,
      },
      birthDate: {
        currentDate: new Date(),
        eighteenYears: new Date(
          new Date().getFullYear() - 18,
          new Date().getMonth(),
          new Date().getDate() + 1
        ),
      },
    };
  },

  mounted() {
    this.getBookmarks();
    this.getPackagePurchased();
    this.getMyOrganization();
    this.getProducts(0, {
      type: 1,
      is_paid: "1",
    });
    this.setProfile();
    this.getProfile();
  },

  methods: {
    setProfile () {
      const user = this.$utils.getUser()
      let newPhone = user.phone
      this.form.name = user.name
      this.form.phone = (newPhone && newPhone.includes(this.prefix)) ? newPhone.slice(this.prefix.length) : newPhone
      this.form.username = user.username
      this.form.dob = this.$utils.getISODate(new Date(user.dob))
      this.form.avatar = user.avatar
      this.form.email = user.email
      this.form.id = user.id
    },
    packageItemClicked() {
      this.$router.push({
        path: "/e-learning",
        query: {
          scroll: "start-learning",
        },
      });
    },
    getProfile() {
      this.$services.user.profile(
        (data) => {
          this.$utils.saveUser(data);
          this.setProfile();
        },
        (msg, err) => {},
        () => {}
      );
    },
    getBookmarks() {
      this.$services.bookmark.get(
        (data) => {
          this.sections[1].products = data;
        },
        (msg, errors) => {},
        () => {}
      );
    },
    getProducts(section, filter) {
      this.$services.product.get(
        filter,
        (data) => {
          this.sections[section].products = data;
        },
        (msg, errors) => {},
        () => {}
      );
    },

    saveProfile() {
      this.loading = true;
      let form = {
        ...this.form,
      };

      if (this.form.phone) {
        // force 0
        let newPhone = this.form.phone;
        if (this.form.phone[0].includes(0)) {
          newPhone = this.form.phone.slice(1);
        }

        // tambahkan prefix
        form.phone = this.prefix + newPhone;
      }

      this.$services.user.updateSelf(
        form,
        (data) => {
          if (
            this.form.username.length <= 5 ||
            this.form.username.length >= 32 ||
            !isNaN(this.form.username[0])
          ) {
            throw new Error();
          }
          let user = this.$utils.getUser();
          user.name = this.form.name;
          user.phone = form.phone;
          user.username = this.form.username;
          user.dob = this.form.dob;
          user.avatar = this.form.avatar;
          this.$utils.saveUser(user);

          this.$q.notify({
            message: "Profil Berhasil disimpan",
            color: "positive",
          });
        },
        (msg, errors) => {
          this.$q.notify({
            message: msg,
            color: "danger",
          });
        },
        () => {
          this.loading = false;
        }
      );
    },

    doLogout() {
      this.$utils.logoutUser();
      this.$global.$emit("user", null);
      this.$router.replace({
        path: "/e-learning",
      });
    },

    changePassword() {
      this.$refs.dialogChangePassword.show();
    },

    getMyOrganization() {
      this.$services.organization.get(
        {
          mine: 1,
          page: 1,
          rows_per_page: 1,
        },
        (data) => {
          this.organizations = data;
        },
        (msg, err) => {},
        () => {}
      );
    },

    getPackagePurchased() {
      this.hasActivePackage = false;
      this.$services.package.getPurchased(
        null,
        (data) => {
          data.forEach((item, i) => {
            if (item.is_active == 1) {
              this.hasActivePackage = true;
            }
            item.dt_start = new Date(item.date_start);
            item.dt_end = new Date(item.date_end);
          });

          this.packages = data;
        },
        (msg, errors) => {
          this.$q.notify({
            message: msg,
            color: "negative",
          });
        },
        () => {}
      );
    },
    onClickPackage(model) {
      this.$router.push({
        path: `/package/${model.id}/${this.$utils.escapeRoute(model.name)}`,
      });
    },
    nameRegex(name) {
      const regex = /^[a-zA-Z ]+$/;
      return regex.test(name);
    },
  },

  watch: {
    searchQuery: function (newVal, oldVal) {
      if (newVal) {
        this.$router.push({
          query: {
            search: newVal,
          },
          path: "/search",
        });
      }
    },
  },
};
</script>
