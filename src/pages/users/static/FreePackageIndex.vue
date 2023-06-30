<template>
  <q-page class="row">
    <section class="bg-secondary-light col-0 col-md-6 flex flex-center">
      <div style="max-width: 100%; overflow: hidden;">
        <img src="/images/illustration/illus-free-package.png"/>
      </div>
    </section>
    <section class="col-12 col-md-6 q-pa-md flex flex-center">
      <div class="container-mini">
        <h1 class="q-mb-sm q-mt-none">
          Yuk Lengkapi Form Berikut!
        </h1>
        <p>
          Kami akan memberikan <strong>paket video gratis 1 minggu</strong> dan juga <strong>rekomendasi video</strong> yang paling cocok berdasarkan profil kamu.
        </p>
        <section>
          <q-input dense class="q-mb-sm" v-model="form.phone" :error="errors.phone != null" :error-message="errors.phone" mask="############" :prefix="prefix" label="No Ponsel" type="tel" debounce="500"/>
          <q-input dense class="q-mb-sm" v-model="form.year_birth" :error="errors.year_birth != null" :error-message="errors.year_birth" label="Tahun Lahir" type="number"/>
          <div  class="q-mb-xs">
            Jenis Kelamin
          </div>
          <div class="q-mb-sm">
            <div>
              <q-radio dense class="q-mr-md" v-model="form.gender" val="M" label="Pria"/>
              <q-radio dense class="q-mr-md" v-model="form.gender" val="F" label="Wanita"/>
            </div>
            <div v-if="errors.gender" style="font-size: 11px;" class="text-negative">
              {{ errors.gender }}
            </div>
          </div>
          <q-select dense class="q-mb-sm" v-model="form.job" :error="errors.job != null" :error-message="errors.job" label="Pekerjaan" behavior="menu" :options="jobs"/>
          <q-select dense class="q-mb-sm" v-model="form.city_id" :error="errors.city_id != null" :error-message="errors.city_id" label="Domisili" @filter="filterCity" behavior="menu"
            ref="citySelect"
            :options="cities"
            use-input
            option-value="id"
            option-label="name"
            emit-value
            map-options
            option-disable="disable"
            @popup-show="onShowCity"/>
          <div  class="q-mb-xs">
            Status
          </div>
          <div class="q-mb-sm">
            <div>
              <q-radio dense class="q-mr-md" v-model="form.is_marriege" :val="true" label="Menikah"/>
              <q-radio dense class="q-mr-md" v-model="form.is_marriege" :val="false" label="Belum Menikah"/>
            </div>
            <div v-if="errors.is_marriege" style="font-size: 11px;" class="text-negative">
              {{ errors.is_marriege }}
            </div>
          </div>
          <q-input dense :disable="form.is_marriege != true" :filled="form.is_marriege != true" class="q-mb-sm" v-model="form.child_count" label="Jumlah Anak" type="number"/>
          <div class="q-mb-sm" style="vertical-align: middle;">
            <q-checkbox v-model="agree"/>
            <span>
              Dengan ini saya menyetujui
              <a href="/media/syarat-dan-ketentuan" target="_blank">
                <b class="text-primary">Syarat dan Ketentuan</b>
              </a>
              yang berlaku.
            </span>
          </div>
          <div class="text-right">
            <q-btn
              :disable="!agree"
              :loading="loading"
              style="font-weight: 600; font-size: 1rem; background-color: #FFCC00; border-radius: 10px;"
              no-caps unelevated
              color="secondary"
              class="text-black q-px-md gtm-track"
              label="Mulai Sekarang"
              @click="submitForm"
              gtm-action="btn_free_package_submit"/>
          </div>
        </section>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      loading: false,

      prefix: '+62',
      form: {
        phone: null,
        year_birth: null,
        gender: null,
        is_marriege: null,
        job: null,
        city_id: null,
        child_count: 0
      },
      errors: {
        phone: null,
        year_birth: null,
        gender: null,
        is_marriege: null,
        job: null,
        city_id: null
      },

      agree: false,

      cities: [],
      citiesOri: [],

      jobs: [
        "Pelajar",
        "Pekerja (PNS / Swasta / Buruh)",
        "Wiraswasta",
        "Ibu Rumah Tangga",
        "Belum Bekerja"
      ]
    }
  },

  mounted () {
    if (this.$utils.getToken() == null) {
      this.$global.$emit('showLogin')
      this.$q.notify({
        message: "Harap login terlebih dahulu",
        color: "negative"
      })
    }
    this.getCities()
  },

  methods: {
    getCities () {
      this.$services.location.getCity((data) => {
        data.forEach((item, i) => {
          item['needle'] = item.name.toLowerCase()
        })

        this.cities = data
        this.citiesOri = data
      }, (msg, data) => {
      }, () => {
      })
    },

    filterCity (val, update) {
      if (val.length === 0) {
        update(() => {
          this.cities = [
            {
              name: 'Harap ketik nama kota',
              disable: true
            }
          ]
        })
        return
      }
      const needle = val.toLowerCase()
      const cities = this.citiesOri.filter((item, i) => {
        return item.needle.indexOf(needle) > -1
      })
      update(() => {
        this.cities = cities
      })
    },

    onShowCity: function (event) {
      console.log(event)
      let city = this.form.city_id
      this.form.city_id = null
      if (city) {
        this.$nextTick(() => {
          this.$refs.citySelect.updateInputValue('')
        })
      }
    },

    submitForm () {
      if (!this.isFormValid()) {
        return
      }
      this.loading = true
      const form = {...this.form}
      form.phone = '+62' + form.phone
      form.child_count = parseInt(form.child_count)
      form.year_birth = parseInt(form.year_birth)
      this.$services.user.fillAdditionalUserProfile(form, (data) => {
        this.$q.notify({
          message: "Berhasil mendapatkan paket gratis 1 Minggu",
          color: "positive"
        })
        this.$router.push({
          name: 'e-learning-recommendation'
        })
      }, (msg, error) => {
        console.log(msg)
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
    },

    isFormValid () {
      const form = this.form
      let isValid = true
      let message = 'Harap lengkapi form'

      Object.keys(this.errors).forEach((key) => {        
        if (this.$utils.isEmpty(form[key])) {
          this.errors[key] = "Harap isi dengan benar"
          isValid = false
        } else {
          this.errors[key] = null
        }
      })

      if (form.year_birth) {
        const yearBirth = parseInt(form.year_birth)
        if (yearBirth < new Date().getFullYear() - 100) {
          isValid = false
          this.errors['year_birth'] = "Maaf Anda terlalu tua untuk ini" // bercanda, harap diganti
        } else if (yearBirth > new Date().getFullYear() - 18) {
          isValid = false
          this.errors['year_birth'] = "Usia minimal 18 tahun"
        }
      }

      if (!this.$utils.isPhoneValid(form.phone, '')) {
        isValid = false
        this.errors.phone = 'Harap isi no ponsel dengan benar'
      } else {
        this.errors.phone = null
      }


      if (this.$utils.getToken() == null) {
        isValid = false
        message = 'Harap Login terlebih dahulu'
        this.$global.$emit('showLogin')
      }

      if (!isValid) {
        this.$q.notify({
          message: message,
          color: 'negative'
        })
      }
      return isValid
    }
  },

  watch: {
    'form.phone': function (newVal) {
      let phone = this.$utils.getPhone(newVal, '0', '')
      if (phone != newVal) {
        this.form.phone = phone
      }
    }
  }
})
</script>
