<template>
  <q-page class="q-pb-md">
    <div
      v-if="setting"
      class="text-white section-banner">
      <div class="container row flex-center q-px-md">
        <div class="flex-1 q-py-md banner-title">
          <h1
            class="text-bold q-mt-none q-mb-sm"
            v-html="$utils.replaceEnter(setting['Job Vacancy Title'])">
          </h1>
          <p
            class="q-mb-none"
            style="font-size: 16px;"
            v-html="$utils.replaceEnter(setting['Job Vacancy Subtitle'])">
          </p>
        </div>
      </div>
    </div>
    <div class="container q-pa-md">
      <!-- <div class="border-bottom q-mb-md">
        <div class="q-mb-md">
          <h1 class="text-primary q-ma-none text-bold" style="font-size: 32px; line-height: 1.01;">
            Lowongan Kerja Terpercaya
          </h1>
        </div>
      </div> -->
      <q-input
        dense outlined rounded
        class="q-mb-md"
        placeholder="Cari lowongan pekerjaan..."
        debounce="500"
        v-model="form.name"
        :loading="loading">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
      <div class="row row-margin">
        <a
          v-for="(vacancy, idx) in vacancys"
          :key="'vacancy-'+idx"
          class="col-md-4 col-12 col-sm-12 q-pa-sm vacancy-item"
          :href="$utils.getToken() ? vacancy.link : null"
          @click="(e) => {
              openJobVacancy(e, vacancy)
            }"
          target="_blank">
          <q-card
            class="cursor-pointer full-height column">
            <div class="price-tag text-bold">
              {{vacancy.salary}}
            </div>
            <div
              class="q-pa-sm column flex-1">
              <div class="row q-mb-sm" style="flex-wrap: nowrap">
                <img :src="vacancy.photo || 'https://finplan.id/finplan-logo.png'"
                  height="56px" width="56px"
                  class="q-mr-sm"/>
                <div class="flex-1">
                  <div class="text-bold ellipsis-2 q-mb-xs" style="font-size: 16px; line-height: 1.2">
                    {{ vacancy.name }}
                  </div>
                  <div class="text-neutral ellipsis-1" style="font-size: 12px; line-height: 1.2">
                    {{ vacancy.company }}
                  </div>
                </div>
              </div>
              <div class="q-mb-sm">
                <div style="height: 20px; display: inline-block" class="q-mr-md">
                  <q-icon
                    size="20px"
                    class="q-mr-xs"
                    color="light"
                    name="place"/>
                  <span class="text-neutral">{{vacancy.location}}</span>
                </div>
                <div style="height: 20px; display: inline-block">
                  <q-icon
                    size="20px"
                    class="q-mr-xs"
                    color="light"
                    name="work"/>
                  <span class="text-neutral">{{vacancy.type}}</span>
                </div>
              </div>
              <div class="q-mb-sm flex-1 ellipsis-3" v-html="vacancy.description">
              </div>
              <div class="text-right" style="min-height: 20px">
              </div>
            </div>
          </q-card>
        </a>
      </div>
    </div>
    <DialogIFrame
      v-model="iframeDialog.dialog"
      :iframe="iframeDialog.iframe"/>
  </q-page>
</template>
<script>
import DialogIFrame from 'components/dialogs/DialogIFrame'
export default {
  components: {
    DialogIFrame
  },

  data () {
    return {
      form: {
        name: ''
      },
      vacancys: [],
      vacancysOri: [],
      loading: false,
      setting: null,
      iframeDialog: {
        dialog: false,
        iframe: ''
      }
    }
  },

  created () {
    this.getJobVacancy()
  },

  methods: {
    getJobVacancy () {
      this.loading = true
      this.$services.getSetting({
      }, (data) => {
        this.setting = data
        this.setupSetting(data)
        this.$nextTick(() => {
          this.form.name = this.$route.query.search
        })
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
        this.loading = false
      }, () => {
        this.loading = false
      })
    },
    setupSetting (setting) {
      let vacancysOri = []
      JSON.parse(setting['Job Vacancy'] || '[]').forEach((item, i) => {
        if (item.active) {
          let allString = ''
          Object.keys(item).forEach((key, i) => {
            allString = allString + ';' + item[key]
          })

          vacancysOri.push({
            ...item,
            lowercase: allString.toLowerCase(),
            dateStr: this.$utils.getDateStr(new Date(item.date)),
            description: item.description.replace(/\n/g, '<br />'),
            price: parseInt(item.price).toLocaleString()
          })
        }
      })

      this.vacancys = vacancysOri
      this.vacancysOri = vacancysOri
    },

    openJobVacancy (e, vacancy) {
      e.preventDefault()
      if (this.$utils.getToken()) {
        let link = ''
        if (vacancy.registration) {
          link = `/page/${this.$route.name}/registration/` + vacancy.val
        } else {
          link = vacancy.link
        }
        this.$utils.track.custom('CariKerja', {name: vacancy.val, link: link});
        window.open(link)
      } else {
        this.$q.notify({
          message: 'Harap masuk untuk dapat melihat vacancy',
          color: 'primary'
        })
        this.$global.$emit('showLogin')
      }
    }
  },

  watch: {
    'form.name': function (newVal, oldVal) {
      let needle = newVal.toLowerCase()
      this.vacancys = this.vacancysOri.filter((val) => val.lowercase.indexOf(needle) > -1)
      this.$router.replace({
        query: {
          search: needle
        }
      })
    }
  }
}
</script>
